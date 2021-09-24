import { Participant } from '../../../DataTypes/Interfaces';
import { countBy, filter, map, orderBy, some } from 'lodash';
import { Initiative } from '../Initiative/Initiative';
import { AddNewParticipant } from '../AddNewParticipant/AddNewParticipant';
import { ListTypes } from '../../../DataTypes/Constants';
import { EncounterService } from '../../../Services/EncounterService';
import { faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setMessageText(messageText: string): void;

  participants: Participant[];
}

export function PrepareParticipantList({ setMessageText, participants }: Props) {
  let counts = countBy(participants, 'initiative');

  const isAnyInitiativeDouble = () => {
    return some(counts, (counter: Number) => {
      return counter > 1;
    });
  };

  const startEncounter = () => {
    setMessageText('');

    if (participants.length <= 1) {
      setMessageText('Please add at least 2 participants');
      return;
    }

    if (typeof counts[0] !== 'undefined') {
      setMessageText('Please set initiative for all participants');
      return;
    } else if (isAnyInitiativeDouble()) {
      setMessageText('Please clean up double initative scores');
      return;
    }
    const newParticipants = orderBy(participants, ['initiative'], ['desc']);

    EncounterService.updateParticipants(newParticipants);
    EncounterService.updateEncounterType(ListTypes.combat);
    EncounterService.resetRound();
  };

  const deleteParticipant = (name: string) => {
    setMessageText('');

    const newParticipants = filter(participants, (participant: Participant) => {
      return participant.name !== name;
    });

    EncounterService.updateParticipants(newParticipants);
  };

  const saveInitiative = (name: string, initiative: number) => {
    setMessageText('');

    const newParticipants = map(participants, (participant: Participant) => {
      if (participant.name === name) {
        participant.initiative = initiative;
      }
      return participant;
    });

    EncounterService.updateParticipants(newParticipants);
  };

  return (
    <div className="participant-list">
      {participants.map((participant: Participant) => {
        return (
          <div className="participant" key={participant.name}>
            <div className="participant-name">{participant.name}</div>
            <div className="participant-initiative">
              <Initiative
                isSameWithSomeoneElse={participant.initiative !== 0 && counts[participant.initiative] > 1}
                initiative={participant.initiative}
                onSaveInitiative={(initiative: number) => {
                  saveInitiative(participant.name, initiative);
                }}
              />
            </div>
            <div className="participant-actions">
              <button onClick={() => deleteParticipant(participant.name)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        );
      })}
      <AddNewParticipant setMessageText={setMessageText} onSubmitHandler={EncounterService.addParticipant} />
      <button onClick={startEncounter}>
        <FontAwesomeIcon icon={faPlayCircle} />
      </button>
    </div>
  );
}
