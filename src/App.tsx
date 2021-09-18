import React from "react";
import {ListTypes} from "./DataTypes/Constants";
import {CombatParticipantList} from "./Components/Molecules/ParticipantList/CombatParticipantList";
import {PrepareParticipantList} from "./Components/Molecules/ParticipantList/PrepareParticipantList";
import {Encounter} from "./DataTypes/Interfaces";
import {EncounterService} from "./Services/EncounterService";

import "./GlobalStyles/GlobalStyles.scss";
import "./App.scss";

interface Props {
}

interface State {
    encounter: Encounter;
    messageText: string;
}

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const currentEncounter = EncounterService.subscribe((encounter: Encounter) => {
            this.setState({encounter: encounter});
        })

        this.state = {
            encounter: currentEncounter,
            messageText: ''
        }
    }

    setListType = (newType: ListTypes) => {
        EncounterService.updateEncounterType(newType);
    }

    setMessageText = (messageText: string) => {
        this.setState({
            messageText: messageText
        });
    }

    render() {
        return (
            <div className="initiative-tool">
                <div className="initiative-list">
                    {this.state.messageText ? <div className="message">{this.state.messageText}</div> : null}
                    {this.state.encounter.state === ListTypes.combat ?
                        <CombatParticipantList currentParticipant={this.state.encounter.currentParticipant}
                                               currentRound={this.state.encounter.currentRound}
                                               setMessageText={this.setMessageText}
                                               participants={this.state.encounter.participants}/> :
                        <PrepareParticipantList setMessageText={this.setMessageText}
                                                participants={this.state.encounter.participants}/>
                    }
                </div>
            </div>
        );
    }

}
