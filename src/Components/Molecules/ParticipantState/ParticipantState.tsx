import {States} from '../../../DataTypes/Constants';
import {Fragment} from 'react';
import {Participant} from '../../../DataTypes/Interfaces';
import {EncounterService} from '../../../Services/EncounterService';

interface Props {
    index: number;
    participant: Participant;
    currentParticipant: number;
}

export const ParticipantState = ({index, currentParticipant, participant}: Props) => {
    const markParticipant = (participantToChange: Participant, state: States) => {
        EncounterService.updateParticipant({
            ...participantToChange,
            state: state,
        } as Participant);
        EncounterService.nextParticipant();
    };

    const resolveNonNormalState = (participant: Participant) => {
        EncounterService.resolveNonNormalState(participant);
    };

    return (
        <Fragment>
            {index === currentParticipant && participant.state === States.normal ? (
                <Fragment>
                    <button
                        className="border-gray-600 border-1 bg-gradient-to-br from-gray-50 to-gray-200 py-0.5 px-1.5 mr-2"
                        onClick={() => markParticipant(participant, States.readied)}>Ready
                    </button>
                    <button
                        className="border-gray-600 border-1 bg-gradient-to-br from-gray-50 to-gray-200 py-0.5 px-1.5"
                        onClick={() => markParticipant(participant, States.delayed)}>Delay
                    </button>
                </Fragment>
            ) : null}
            {index !== currentParticipant && participant.state !== States.normal ? (
                <Fragment>
                    {participant.state}
                    <button
                        className="border-gray-600 border-1 bg-gradient-to-br from-gray-50 to-gray-200 py-0.5 px-1.5 ml-2"
                        onClick={() => resolveNonNormalState(participant)}>Resolve state
                    </button>
                </Fragment>
            ) : null}
        </Fragment>
    );
}
