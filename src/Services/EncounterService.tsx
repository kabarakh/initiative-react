import {Encounter, Participant} from "../DataTypes/Interfaces";
import {BehaviorSubject} from "rxjs";
import {find, findIndex, map} from "lodash";
import {ListTypes, States} from "../DataTypes/Constants";

export namespace EncounterService {

    export const defaultEncounter: Encounter = {
        participants: [],
        state: ListTypes.prepare,
        currentParticipant: 0,
        currentRound: 0,
    }

    const storedEncounter = window.localStorage.getItem('encounter');
    let encounter: Encounter;
    if (storedEncounter) {
        encounter = JSON.parse(storedEncounter) as Encounter;
    } else {
        encounter = defaultEncounter;
    }
    const encounterBehaviorSubject: BehaviorSubject<Encounter> = new BehaviorSubject<Encounter>(encounter);

    export const subscribe = (callback: (encounter: Encounter) => void): Encounter => {
        encounterBehaviorSubject.subscribe(callback);
        return encounter;
    }

    export function refresh() {
        window.localStorage.setItem('encounter', JSON.stringify(encounter));
        encounterBehaviorSubject.next(encounter);
    }

    export const updateEncounterType = (newType: ListTypes) => {
        encounter.state = newType;
        refresh();
    }

    export const updateParticipant = (newParticipant: Participant): void => {
        const newParticipants = map(encounter.participants, (participant: Participant) => {
            if (participant.name === newParticipant.name) {
                return newParticipant;
            } else {
                return participant;
            }
        });

        encounter = {
            ...encounter,
            participants: newParticipants
        };

        refresh();
    }

    export function updateParticipants(newParticipants: Participant[]) {
        encounter = {
            ...encounter,
            participants: newParticipants
        };

        refresh();
    }

    export const addParticipant = (name: string): boolean => {
        const foundElements = find(encounter.participants, (participant: Participant) => {
            return name.toLowerCase() === participant.name.toLowerCase();
        });

        if (typeof foundElements !== 'undefined') {
            return false;
        }

        const newParticipant: Participant = {
            name: name,
            initiative: 0,
            state: States.normal
        };

        const newEncounter = {...encounter};

        newEncounter.participants.push(newParticipant);
        refresh();
        return true;
    }

    export const nextRound = () => {
        encounter = {
            ...encounter,
            currentRound: encounter.currentRound + 1
        };
        refresh();
    }

    export const nextParticipant = () => {
        let nextParticipant = encounter.currentParticipant +1;
        if (nextParticipant === encounter.participants.length) {
            nextParticipant = 0;
            nextRound();
        }
        encounter = {
            ...encounter,
            currentParticipant: nextParticipant
        };
        refresh();
    }

    export const resetRound = () => {
        encounter = {
            ...encounter,
            currentRound: 0,
            currentParticipant: 0
        };
        refresh();
    }

    export const resolveNonNormalState = (name: string) => {
        const participantIndex = findIndex(encounter.participants, {name: name});

        const participant = encounter.participants[participantIndex];
        const oldState = participant.state;
        participant.state = States.normal;

        encounter.participants.splice(participantIndex, 1);
        const targetIndex = participantIndex > encounter.currentParticipant ? encounter.currentParticipant : encounter.currentParticipant - 1;
        encounter.participants.splice(targetIndex, 0, participant);

        if (oldState === States.delayed && participantIndex < encounter.currentParticipant) {
            encounter.currentParticipant--;
        } else if (oldState === States.readied && participantIndex > encounter.currentParticipant) {
            encounter.currentParticipant++;
        }

        refresh();
    }
}
