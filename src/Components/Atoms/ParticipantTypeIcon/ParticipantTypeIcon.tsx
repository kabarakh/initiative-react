import {ParticipantTypes} from "../../../DataTypes/Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDragon, faUser} from "@fortawesome/free-solid-svg-icons";

interface Props {
    participantType: ParticipantTypes
}

export function ParticipantTypeIcon({participantType}: Props) {
    return (
        participantType === ParticipantTypes.player ? <FontAwesomeIcon icon={faUser}/> :
            <FontAwesomeIcon icon={faDragon}/>
    )
}
