import {ParticipantTypes} from "../../../DataTypes/Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDragon, faUser, faHandshake, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

interface Props {
    participantType: ParticipantTypes
}

export function ParticipantTypeIcon({participantType}: Props) {

    const getIconForType = () => {
        switch(participantType) {
            case ParticipantTypes.ally:
                return faHandshake;
            case ParticipantTypes.monster:
                return faDragon;
            case ParticipantTypes.player:
                return faUser;
            default:
                return faQuestionCircle;
        }
    }

    return (
        <FontAwesomeIcon icon={getIconForType()}/>
    )
}
