import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ParticipantTypes, States } from '../../../DataTypes/Constants';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { encounterState, messageTextState } from '../../../States/States';
import { find } from 'lodash';
import { Participant } from '../../../DataTypes/Interfaces';
import { Translation } from '../../Atoms/Translation/Translation';

export const AddNewParticipant = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [type, setType] = useState(ParticipantTypes.monster);
    const setMessageText = useSetRecoilState(messageTextState);
    const [encounter, setEncounter] = useRecoilState(encounterState);
    const participants = encounter.participants;

    const updateName = (eventHandler: FormEvent<HTMLInputElement>) => {
        eventHandler.preventDefault();

        setClassName('');
        setName(eventHandler.currentTarget.value);
    };

    const addParticipant = (name: string, type: ParticipantTypes) => {
        const foundElements = find(encounter.participants, (participant: Participant) => {
            return name.toLowerCase() === participant.name.toLowerCase();
        });

        if (typeof foundElements !== 'undefined') {
            return false;
        }

        const newParticipant: Participant = {
            name: name,
            initiative: 0,
            state: States.normal,
            type: type,
        };

        const newEncounter = {
            ...encounter,
            participants: [...participants, newParticipant],
        };

        setEncounter(newEncounter);
        return true;
    };

    const submitHandler = (eventHandler: FormEvent<HTMLFormElement>) => {
        eventHandler.preventDefault();
        setClassName('');

        if (name !== '') {
            const result = addParticipant(name, type);
            if (result === true) {
                setName('');
            } else {
                setClassName('error');
                setMessageText(`Duplicate name (${name})`);
            }
        }
    };

    const updateType = (event: FormEvent<HTMLSelectElement>) => {
        console.log(<Translation key={'label.monster'} />);
        setType(event.currentTarget.value as ParticipantTypes);
    };

    return (
        <div className="add-participant my-3">
            <form onSubmit={submitHandler} className={className}>
                <input className="me-3" type="text" value={name} onInput={updateName} />
                <select className="me-3" value={type} onChange={updateType}>
                    <option value={ParticipantTypes.monster}>
                        <Translation key={'label.monster'} />
                    </option>
                    <option value={ParticipantTypes.player}>
                        <Translation key={'label.player'} />
                    </option>
                    <option value={ParticipantTypes.ally}>
                        <Translation key={'label.ally'} />
                    </option>
                </select>
                <button type="submit">
                    <FontAwesomeIcon icon={faPlusSquare} />
                </button>
            </form>
        </div>
    );
};
