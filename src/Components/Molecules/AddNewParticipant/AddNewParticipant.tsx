import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { EncounterService } from '../../../Services/EncounterService';

interface Props {
  setMessageText(message: string): void;
}

export function AddNewParticipant({ setMessageText }: Props) {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [isPlayer, setIsPlayer] = useState(false);

  const updateName = (eventHandler: FormEvent<HTMLInputElement>) => {
    eventHandler.preventDefault();

    setClassName('');
    setName(eventHandler.currentTarget.value);
  };

  const updateType = () => {
    setIsPlayer(!isPlayer);
  };

  const submitHandler = (eventHandler: FormEvent<HTMLFormElement>) => {
    eventHandler.preventDefault();
    setClassName('');
    setIsPlayer(false);

    if (name !== '') {
      const result = EncounterService.addParticipant(name, isPlayer);
      if (result === true) {
        setName('');
      } else {
        setClassName('error');
        setMessageText(`Duplicate name (${name})`);
      }
    }
  };

  return (
    <div className="add-participant">
      <form onSubmit={submitHandler} className={className}>
        <input type="text" value={name} onInput={updateName} />
        <label>
          Player character
          <input type="checkbox" value="1" checked={isPlayer} onChange={updateType} />
        </label>
        <button type="submit">
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </form>
    </div>
  );
}
