import {FormEvent, Fragment, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faPenSquare, faPlusCircle, faSave} from '@fortawesome/free-solid-svg-icons';

interface Props {
    initiative: number;
    isSameWithSomeoneElse: boolean;

    onSaveInitiative(initiative: number): void;
}

export const Initiative = ({initiative, isSameWithSomeoneElse, onSaveInitiative}: Props) => {
    const [currentInitiative, setCurrentInitiative] = useState(initiative);
    const [editMode, setEditMode] = useState(false);

    const editForTiebreaker = (addition: number) => {
        const newInitiative = Number((currentInitiative + addition / 10).toFixed(1));
        setCurrentInitiative(newInitiative);
        onSaveInitiative(newInitiative);
    };

    const updateInitiative = (inputEvent: FormEvent<HTMLInputElement>) => {
        inputEvent.preventDefault();
        let newValue = parseInt(inputEvent.currentTarget.value, 10);
        if (isNaN(newValue)) {
            newValue = 0;
        }
        setCurrentInitiative(newValue);
    };

    const saveInitiative = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        onSaveInitiative(currentInitiative);
        setEditMode(false);
    };

    return (
        <div className="initiative">
            {editMode ? (
                <form onSubmit={saveInitiative}>
                    <input className="w-9/12 outline-black text-right mr-6" type="text" value={currentInitiative}
                           onInput={updateInitiative}/>
                    <span className="w-1/12">
            <button type="submit">
              <FontAwesomeIcon icon={faSave}/>
            </button>
            </span>
                </form>
            ) : (
                <div className={isSameWithSomeoneElse ? 'same-with-someone' : ''}>
                    <span className="w-9/12 d-inline-block text-right mr-6">{currentInitiative}</span>
                    <span className="w-1/12">
          <button
              className="mr-2"
              onClick={() => {
                  setEditMode(true);
              }}
          >
            <FontAwesomeIcon icon={faPenSquare}/>
          </button>
                        {isSameWithSomeoneElse ? (
                            <Fragment>
                                <button
                                    className="mr-2"
                                    onClick={() => {
                                        editForTiebreaker(1);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </button>
                                <button
                                    className="mr-2"
                                    onClick={() => {
                                        editForTiebreaker(-1);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMinusCircle}/>
                                </button>
                            </Fragment>
                        ) : null}
          </span>
                </div>
            )}
        </div>
    );
}
