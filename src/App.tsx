import {Component} from 'react';
import {ListTypes} from './DataTypes/Constants';
import {CombatParticipantList} from './Components/Molecules/ParticipantList/CombatParticipantList';
import {PrepareParticipantList} from './Components/Molecules/ParticipantList/PrepareParticipantList';
import {Encounter} from './DataTypes/Interfaces';
import {EncounterService} from './Services/EncounterService';

import './GlobalStyles/GlobalStyles.scss';

interface Props {
}

interface State {
    encounter: Encounter;
    messageText: string;
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const currentEncounter = EncounterService.subscribe((encounter: Encounter) => {
            this.setState({encounter: encounter});
        });

        this.state = {
            encounter: currentEncounter,
            messageText: '',
        };
    }

    setListType = (newType: ListTypes) => {
        EncounterService.updateEncounterType(newType);
    };

    setMessageText = (messageText: string) => {
        this.setState({
            messageText: messageText,
        });
    };

    render() {
        return (
            <div className="initiative-tool container my-3">
                <div className="initiative-list">
                    {this.state.messageText ? <div className="message text-gray-200 p-2 bg-gradient-to-br from-red-500 to-red-900 mb-3">{this.state.messageText}</div> : null}
                    {this.state.encounter.state === ListTypes.combat ? (
                        <CombatParticipantList
                            currentParticipant={this.state.encounter.currentParticipant}
                            currentRound={this.state.encounter.currentRound}
                            setMessageText={this.setMessageText}
                            participants={this.state.encounter.participants}
                        />
                    ) : (
                        <PrepareParticipantList
                            setMessageText={this.setMessageText}
                            participants={this.state.encounter.participants}
                        />
                    )}
                </div>
            </div>
        );
    }
}
