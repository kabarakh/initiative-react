import { Encounter, Participant } from '../../../DataTypes/Interfaces';
import { filter, map } from 'lodash';
import { ListTypes, ParticipantTypes, States } from '../../../DataTypes/Constants';
import { faAngleDoubleRight, faHandPointRight, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ParticipantState } from '../ParticipantState/ParticipantState';
import { ParticipantTypeIcon } from '../../Atoms/ParticipantTypeIcon/ParticipantTypeIcon';
import { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { encounterState } from '../../../States/States';

export const CombatParticipantList = () => {
    const [encounter, setEncounter] = useRecoilState(encounterState);
    const { participants, currentRound, currentParticipant } = encounter;

    const endEncounter = (): void => {
        let resetParticipants = filter(participants, { type: ParticipantTypes.player });
        resetParticipants = map(resetParticipants, (participant: Participant) => {
            return {
                ...participant,
                initiative: 0,
                state: States.normal,
            };
        });

        setEncounter({
            ...encounter,
            state: ListTypes.prepare,
            participants: resetParticipants,
        });
    };

    const nextRound = () => {
        setEncounter({
            ...encounter,
            currentRound: encounter.currentRound + 1,
            currentParticipant: 0,
        });
    };

    const nextParticipantHandler = () => {
        nextParticipant();
    };

    const nextParticipant = (newEncounterData?: Encounter) => {
        if (!newEncounterData) {
            newEncounterData = { ...encounter };
        }
        let round = newEncounterData.currentRound;
        let nextParticipant = newEncounterData.currentParticipant + 1;
        if (nextParticipant === newEncounterData.participants.length) {
            nextParticipant = 0;
            round = round + 1;
        }
        setEncounter({
            ...newEncounterData,
            currentParticipant: nextParticipant,
            currentRound: round,
        });
    };

    return (
        <div className="participant-list combat-list">
            <button onClick={nextParticipantHandler}>
                <FontAwesomeIcon size="2x" icon={faAngleDoubleRight} />
            </button>
            <div className="round-count">
                Round:{' '}
                {currentRound === 0 ? (
                    <Fragment>
                        Surprise round
                        <button className="py-1 px-2 ms-2" onClick={nextRound}>
                            Skip
                        </button>
                    </Fragment>
                ) : (
                    <Fragment>{currentRound}</Fragment>
                )}
            </div>
            {participants.map((participant: Participant, index: number) => {
                return (
                    <div
                        className={`row align-items-baseline participant p-2 ${participant.state}`}
                        key={participant.name}
                    >
                        <div className="participant-type col-1">
                            <ParticipantTypeIcon participantType={participant.type} />
                        </div>
                        <div className="col-6 participant-name">
                            {index === currentParticipant ? (
                                <FontAwesomeIcon className="me-2" icon={faHandPointRight} />
                            ) : (
                                ''
                            )}
                            {participant.name}
                        </div>
                        <div className="col-3 participant-initiative">{participant.initiative}</div>
                        <div className="col-2 participant-actions">
                            <ParticipantState
                                nextParticipant={nextParticipant}
                                index={index}
                                participant={participant}
                                currentParticipant={currentParticipant}
                            />
                        </div>
                    </div>
                );
            })}
            <div className="my-3">
                <button className="py-1 px-2" onClick={endEncounter}>
                    End <FontAwesomeIcon icon={faStopCircle} />
                </button>
            </div>
        </div>
    );
};
