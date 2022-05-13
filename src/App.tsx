import { ListTypes } from './DataTypes/Constants';
import { CombatParticipantList } from './Components/Molecules/ParticipantList/CombatParticipantList';
import { PrepareParticipantList } from './Components/Molecules/ParticipantList/PrepareParticipantList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentLanguageState, encounterState, messageTextState } from './States/States';

import './GlobalStyles/GlobalStyles.scss';
import { FormEvent, Fragment } from 'react';

export const App = () => {
    const messageText = useRecoilValue(messageTextState);
    const encounter = useRecoilValue(encounterState);
    const [currentLanguage, setCurrentLanguage] = useRecoilState(currentLanguageState);

    const availableLanguages = [
        { key: 'de', label: 'Deutsch' },
        { key: 'en', label: 'English' },
    ];

    const languageSelectorChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
        setCurrentLanguage(event.currentTarget.value);
    };

    return (
        <Fragment>
            <select defaultValue={currentLanguage} onSelect={languageSelectorChangeHandler}>
                {availableLanguages.map((languageConfig) => {
                    return (
                        <option key={languageConfig.key} value={languageConfig.key}>
                            {languageConfig.label}
                        </option>
                    );
                })}
            </select>
            <div className="initiative-tool container my-3">
                <div className="initiative-list">
                    {messageText ? <div className="message p-2 mb-3">{messageText}</div> : null}
                    {encounter.state === ListTypes.combat ? <CombatParticipantList /> : <PrepareParticipantList />}
                </div>
            </div>
        </Fragment>
    );
};
