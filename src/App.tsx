import { ListTypes } from './DataTypes/Constants';
import { CombatParticipantList } from './Components/Molecules/ParticipantList/CombatParticipantList';
import { PrepareParticipantList } from './Components/Molecules/ParticipantList/PrepareParticipantList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { encounterState, messageTextState } from './States/States';

export const App = () => {
    const [messageText] = useRecoilState(messageTextState);
    const encounter = useRecoilValue(encounterState);

    return (
        <div className="initiative-tool container my-3">
            <div className="initiative-list">
                {messageText ? (
                    <div className="message text-gray-200 p-2 bg-gradient-to-br from-red-500 to-red-900 mb-3">
                        {messageText}
                    </div>
                ) : null}
                {encounter.state === ListTypes.combat ? <CombatParticipantList /> : <PrepareParticipantList />}
            </div>
        </div>
    );
};
