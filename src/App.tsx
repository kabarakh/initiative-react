import { ListTypes } from './DataTypes/Constants';
import { CombatParticipantList } from './Components/Molecules/ParticipantList/CombatParticipantList';
import { PrepareParticipantList } from './Components/Molecules/ParticipantList/PrepareParticipantList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { encounterState, messageTextState } from './States/States';

import './GlobalStyles/GlobalStyles.scss';

export const App = () => {
    const [messageText] = useRecoilState(messageTextState);
    const encounter = useRecoilValue(encounterState);

    return (
        <div className="initiative-tool container my-3">
            <div className="initiative-list">
                {messageText ? <div className="message p-2 mb-3">{messageText}</div> : null}
                {encounter.state === ListTypes.combat ? <CombatParticipantList /> : <PrepareParticipantList />}
            </div>
        </div>
    );
};
