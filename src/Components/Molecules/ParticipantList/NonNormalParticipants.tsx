import {Participant} from "../../../DataTypes/Interfaces";
import {filter, map} from "lodash";
import {States} from "../../../DataTypes/Constants";
import {EncounterService} from "../../../Services/EncounterService";

interface Props {
    participants: Participant[];
}

export function NonNormalParticipants({participants}: Props) {

    const filterParticipants = () => {
        return filter(participants, (participant: Participant) => {
            return participant.state !== States.normal;
        });
    }

    const resolve = (participant: Participant) => {
        EncounterService.resolveNonNormalState(participant.name);
    }

    return (
        <div className="non-normal-participants">
            {map(filterParticipants(), (participant: Participant) => {
                return <div>
                    {participant.name} ({participant.state})

                    <button onClick={() => {resolve(participant)}}>Resolve state</button>
                </div>
            })}
        </div>
    )
}
