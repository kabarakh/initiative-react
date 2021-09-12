import React from 'react';
import {Participant} from "../../../DataTypes/Interfaces";
import {find, map} from "lodash";
import {ListTypes, States} from "../../../DataTypes/Constants";
import {EncounterService} from "../../../Services/EncounterService";
import {NonNormalParticipants} from "./NonNormalParticipants";

interface Props {
    setMessageText(messageText: string): void
    participants: Participant[];
    currentRound: number;
    currentParticipant: number;
}

export function CombatParticipantList({participants, setMessageText, currentParticipant, currentRound}: Props) {

    const endEncounter = (): void => {
        const resetParticipants = map(participants, (participant: Participant) => {
            participant.initiative = 0;
            participant.state = States.normal;
            return participant;
        });
        EncounterService.updateEncounterType(ListTypes.prepare);
        EncounterService.updateParticipants(resetParticipants);
    };

    const markParticipant = (name: string, state: States) => {
        const participantToChange = find(participants, {name: name});

        EncounterService.updateParticipant({
            ...participantToChange,
            state: state
        } as Participant);
    }

    const nextParticipant = () => {
        EncounterService.nextParticipant();
    }

    const nextRound = () => {
        EncounterService.nextRound();
    }

    return (
        <div className="participant-list combat-list">
            <button onClick={nextParticipant}>Next</button>
            {currentRound === 0 ? <button onClick={nextRound}>Skip surprise round</button>: null }
            <div className="round-count">{currentRound === 0 ? 'Surprise round' : `Round ${currentRound}`}</div>
            {participants.map((participant: Participant, index: number) => {
                return <div className={`participant ${participant.state}`} key={participant.name}>
                    <div className="participant-name">
                        {index === currentParticipant ? '=> ' : ''}{participant.name}
                    </div>
                    <div className="participant-initiative">
                        {participant.initiative}
                    </div>
                    <div className="participant-actions">
                        {participant.state === States.normal ? <React.Fragment>
                            <button onClick={() => markParticipant(participant.name, States.readied)}>Ready</button>
                            <button onClick={() => markParticipant(participant.name, States.delayed)}>Delay</button>
                        </React.Fragment> : <button onClick={() => markParticipant(participant.name, States.normal)}>Reset state</button>
                        }
                    </div>
                </div>
            })}
            <NonNormalParticipants participants={participants} />
            <button onClick={endEncounter}>End Encounter</button>

        </div>
    )
}
