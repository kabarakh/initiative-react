import { Participant } from '../../../DataTypes/Interfaces';
import { countBy, filter, map, orderBy, some } from 'lodash';
import { Initiative } from '../Initiative/Initiative';
import { AddNewParticipant } from '../AddNewParticipant/AddNewParticipant';
import { ListTypes } from '../../../DataTypes/Constants';
import { faPlayCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ParticipantTypeIcon } from '../../Atoms/ParticipantTypeIcon/ParticipantTypeIcon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { encounterState, messageTextState } from '../../../States/States';

export const PrepareParticipantList = () => {
    const setMessageText = useSetRecoilState(messageTextState);
    const [encounter, setEncounter] = useRecoilState(encounterState);
    const participants = encounter.participants;

    const counts = countBy(participants, 'initiative');

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
            setMessageText('Please clean up double initiative scores');
            return;
        }
        const newParticipants = orderBy(participants, ['initiative'], ['desc']);

        setEncounter({
            ...encounter,
            participants: newParticipants,
            state: ListTypes.combat,
            currentRound: 0,
            currentParticipant: 0,
        });
    };

    const deleteParticipant = (name: string) => {
        setMessageText('');

        const newParticipants = filter(participants, (participant: Participant) => {
            return participant.name !== name;
        });

        setEncounter({
            ...encounter,
            participants: newParticipants,
        });
    };

    const saveInitiative = (name: string, initiative: number) => {
        setMessageText('');

        const newParticipants = map(participants, (participant: Participant) => {
            if (participant.name === name) {
                return {
                    ...participant,
                    initiative: initiative,
                };
            }
            return participant;
        });

        setEncounter({
            ...encounter,
            participants: newParticipants,
        });
    };

    return (
        <div className="participant-list">
            {participants.map((participant: Participant) => {
                return (
                    <div className="row participant align-items-baseline p-2" key={participant.name}>
                        <div className="col-1 participant-type">
                            <ParticipantTypeIcon participantType={participant.type} />
                        </div>
                        <div className="col-6 participant-name">{participant.name}</div>
                        <div className="col-4 participant-initiative">
                            <Initiative
                                isSameWithSomeoneElse={
                                    participant.initiative !== 0 && counts[participant.initiative] > 1
                                }
                                initiative={participant.initiative}
                                onSaveInitiative={(initiative: number) => {
                                    saveInitiative(participant.name, initiative);
                                }}
                            />
                        </div>
                        <div className="col-1 participant-actions">
                            <button onClick={() => deleteParticipant(participant.name)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                );
            })}
            <AddNewParticipant />
            <button className="py-1 px-2" onClick={startEncounter}>
                Start <FontAwesomeIcon icon={faPlayCircle} />
            </button>
        </div>
    );
};
