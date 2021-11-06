import {FormEvent, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {EncounterService} from '../../../Services/EncounterService';
import {ParticipantTypes} from "../../../DataTypes/Constants";

interface Props {
    setMessageText(message: string): void;
}

export function AddNewParticipant({setMessageText}: Props) {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [type, setType] = useState(ParticipantTypes.monster);

    const updateName = (eventHandler: FormEvent<HTMLInputElement>) => {
        eventHandler.preventDefault();

        setClassName('');
        setName(eventHandler.currentTarget.value);
    };

    const submitHandler = (eventHandler: FormEvent<HTMLFormElement>) => {
        eventHandler.preventDefault();
        setClassName('');

        if (name !== '') {
            const result = EncounterService.addParticipant(name, type);
            if (result === true) {
                setName('');
            } else {
                setClassName('error');
                setMessageText(`Duplicate name (${name})`);
            }
        }
    };

    const updateType = (event: FormEvent<HTMLSelectElement>) => {
        setType(event.currentTarget.value as ParticipantTypes)
    }

    return (
        <div className="add-participant my-3">
            <form onSubmit={submitHandler} className={className}>
                <input className="outline-black mr-3" type="text" value={name} onInput={updateName}/>
                <select className="outline-black mr-3" value={type} onChange={updateType}>
                    <option value={ParticipantTypes.monster}>Monster</option>
                    <option value={ParticipantTypes.player}>Player</option>
                    <option value={ParticipantTypes.ally}>Ally</option>
                </select>
                <button type="submit">
                    <FontAwesomeIcon icon={faPlusSquare}/>
                </button>
            </form>
        </div>
    );
}
