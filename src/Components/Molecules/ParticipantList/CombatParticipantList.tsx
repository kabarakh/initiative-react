import { Participant } from '../../../DataTypes/Interfaces';
import { map } from 'lodash';
import { ListTypes, States } from '../../../DataTypes/Constants';
import { EncounterService } from '../../../Services/EncounterService';
import { faAngleDoubleRight, faHandPointRight, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ParticipantState } from '../ParticipantState/ParticipantState';

interface Props {
  setMessageText(messageText: string): void;

  participants: Participant[];
  currentRound: number;
  currentParticipant: number;
}

export function CombatParticipantList({ participants, setMessageText, currentParticipant, currentRound }: Props) {
  const endEncounter = (): void => {
    const resetParticipants = map(participants, (participant: Participant) => {
      participant.initiative = 0;
      participant.state = States.normal;
      return participant;
    });
    EncounterService.updateEncounterType(ListTypes.prepare);
    EncounterService.updateParticipants(resetParticipants);
  };

  const nextParticipant = () => {
    EncounterService.nextParticipant();
  };

  const nextRound = () => {
    EncounterService.nextRound();
  };

  return (
    <div className="participant-list combat-list">
      <button onClick={nextParticipant}>
        <FontAwesomeIcon size="2x" icon={faAngleDoubleRight} />
      </button>
      {currentRound === 0 ? <button onClick={nextRound}>Skip surprise round</button> : null}
      <div className="round-count">{currentRound === 0 ? 'Surprise round' : `Round ${currentRound}`}</div>
      {participants.map((participant: Participant, index: number) => {
        return (
          <div className={`participant ${participant.state}`} key={participant.name}>
            <div className="participant-name">
              {index === currentParticipant ? <FontAwesomeIcon icon={faHandPointRight} /> : ''}
              {participant.name}
            </div>
            <div className="participant-initiative">{participant.initiative}</div>
            <div className="participant-actions">
              <ParticipantState index={index} participant={participant} currentParticipant={currentParticipant} />
            </div>
          </div>
        );
      })}
      <button onClick={endEncounter}>
        <FontAwesomeIcon icon={faStopCircle} />
      </button>
    </div>
  );
}
