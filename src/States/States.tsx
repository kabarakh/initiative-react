import { Encounter } from '../DataTypes/Interfaces';
import { ListTypes } from '../DataTypes/Constants';
import { atom } from 'recoil';

const defaultEncounter: Encounter = {
    participants: [],
    state: ListTypes.prepare,
    currentParticipant: 0,
    currentRound: 0,
};

const localStorageEffect =
    (key: string) =>
    ({ setSelf, onSet }: any) => {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue: Encounter) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

export const messageTextState = atom({
    key: 'messageText', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const encounterState = atom({
    key: 'encounter', // unique ID (with respect to other atoms/selectors)
    default: defaultEncounter, // default value (aka initial value),
    effects: [localStorageEffect('encounter')],
});
