import { States } from '../../../DataTypes/Constants';
import { Fragment } from 'react';
import { Participant } from '../../../DataTypes/Interfaces';
import { EncounterService } from '../../../Services/EncounterService';

interface Props {
  index: number;
  participant: Participant;
  currentParticipant: number;
}

export function ParticipantState({ index, currentParticipant, participant }: Props) {
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
          <button onClick={() => markParticipant(participant, States.readied)}>Ready</button>
          <button onClick={() => markParticipant(participant, States.delayed)}>Delay</button>
        </Fragment>
      ) : null}
      {index !== currentParticipant && participant.state !== States.normal ? (
        <Fragment>
          {participant.state}
          <button onClick={() => resolveNonNormalState(participant)}>Resolve state</button>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
