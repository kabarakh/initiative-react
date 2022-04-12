import { States } from '../../../DataTypes/Constants';
import { Fragment } from 'react';
import { Encounter, Participant } from '../../../DataTypes/Interfaces';
import { useRecoilState } from 'recoil';
import { encounterState } from '../../../States/States';
import { findIndex, map } from 'lodash';

interface Props {
    index: number;
    participant: Participant;
    currentParticipant: number;

    nextParticipant(newEncounterData: Encounter): void;
}

export const ParticipantState = ({ index, currentParticipant, participant, nextParticipant }: Props) => {
    const [encounter, setEncounter] = useRecoilState(encounterState);

    const markParticipant = (participantToChange: Participant, state: States) => {
        const newParticipants = map(encounter.participants, (participant) => {
            if (participant.name === participantToChange.name) {
                return {
                    ...participant,
                    state: state,
                };
            }
            return participant;
        });

        nextParticipant({
            ...encounter,
            participants: newParticipants,
        });
    };

    const resolveNonNormalState = (participant: Participant) => {
        const participantIndex = findIndex(encounter.participants, { name: participant.name });

        let newParticipants = [...encounter.participants];

        const participantToWorkWith = { ...encounter.participants[participantIndex] };
        const oldState = participantToWorkWith.state;
        participantToWorkWith.state = States.normal;

        newParticipants.splice(participantIndex, 1);
        const targetIndex =
            participantIndex > encounter.currentParticipant
                ? encounter.currentParticipant
                : encounter.currentParticipant - 1;
        newParticipants.splice(targetIndex, 0, participantToWorkWith);

        let newCurrentParticipant = encounter.currentParticipant;
        if (oldState === States.delayed && participantIndex < encounter.currentParticipant) {
            newCurrentParticipant = encounter.currentParticipant - 1;
        } else if (oldState === States.readied && participantIndex > encounter.currentParticipant) {
            newCurrentParticipant = encounter.currentParticipant + 1;
        }

        setEncounter({
            ...encounter,
            participants: newParticipants,
            currentParticipant: newCurrentParticipant,
        });
    };

    return (
        <Fragment>
            {index === currentParticipant && participant.state === States.normal ? (
                <Fragment>
                    <button className="px-2 me-2" onClick={() => markParticipant(participant, States.readied)}>
                        Ready
                    </button>
                    <button className="px-2" onClick={() => markParticipant(participant, States.delayed)}>
                        Delay
                    </button>
                </Fragment>
            ) : null}
            {index !== currentParticipant && participant.state !== States.normal ? (
                <Fragment>
                    {participant.state}
                    <button className="px-2 ms-2" onClick={() => resolveNonNormalState(participant)}>
                        Resolve state
                    </button>
                </Fragment>
            ) : null}
        </Fragment>
    );
};
