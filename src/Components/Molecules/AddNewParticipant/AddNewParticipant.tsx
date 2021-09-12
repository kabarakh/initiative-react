import React, {FormEvent, useState} from 'react';

interface Props {
    onSubmitHandler(name: string): boolean;
    setMessageText(message: string): void;
}

export function AddNewParticipant({onSubmitHandler, setMessageText}: Props) {

    const [name, setName] = useState('');
    const [className, setClassName] = useState('');

    const updateName = (eventHandler: FormEvent<HTMLInputElement>) => {
        eventHandler.preventDefault();

        setClassName('');
        setName(eventHandler.currentTarget.value);

    };

    const submitHandler = (eventHandler: FormEvent<HTMLFormElement>) => {
        eventHandler.preventDefault();
        setClassName('');

        if (name !== '') {
            const result = onSubmitHandler(name);
            if (result === true) {
                setName('');
            } else {
                setClassName('error');
                setMessageText(`Duplicate name (${name})`);
            }
        }
    }

    return (
        <div className="add-participant">
            <form onSubmit={submitHandler} className={className}>
                <input type="text" value={name} onInput={updateName}/>
                <input type="submit" value="+"/>
            </form>
        </div>
    );
}
