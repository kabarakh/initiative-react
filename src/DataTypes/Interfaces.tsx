import { ListTypes, ParticipantTypes, States } from './Constants';

export interface Participant {
  name: string;
  state: States;
  initiative: number;
  type: ParticipantTypes;
}

export interface Encounter {
  participants: Participant[];
  state: ListTypes;
  currentParticipant: number;
  currentRound: number;
}
