import { ListTypes, States } from './Constants';

export interface Participant {
  name: string;
  state: States;
  initiative: number;
}

export interface Encounter {
  participants: Participant[];
  state: ListTypes;
  currentParticipant: number;
  currentRound: number;
}
