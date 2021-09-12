import React, {FormEvent, useState} from 'react';

interface Props {
    initiative: number;

    onSaveInitiative(initiative: number): void;
}

export function Initiative({initiative, onSaveInitiative}: Props) {
    const [currentInitiative, setCurrentInitiative] = useState(initiative);
    const [editMode, setEditMode] = useState(false);

    const updateInitiative = (inputEvent: FormEvent<HTMLInputElement>) => {
        inputEvent.preventDefault();
        let newValue = parseInt(inputEvent.currentTarget.value, 10);
        if (isNaN(newValue)) {
            newValue = 0;
        }
        setCurrentInitiative(newValue);
    }

    const saveInitiative = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        onSaveInitiative(currentInitiative);
        setEditMode(false);
    }

    return (
        <div className='initiative'>
            {
                editMode ?
                    <form onSubmit={saveInitiative}>
                        <input type="text" value={currentInitiative} onInput={updateInitiative}/>
                        <input type="submit" value="Save"/>
                    </form> :
                    <div>{currentInitiative}
                        <button onClick={() => {
                            setEditMode(true)
                        }}>Set initiative
                        </button>
                    </div>
            }
        </div>
    )
}
