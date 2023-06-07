import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getGroupDetails, joinRequest } from "../../store/group";

function JoinGroupModal({ gId, uId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state?.session?.user?.id)
    const group = useSelector(state => state?.groups?.groupDetails)
    const members = group?.members
    const requests = group?.requests
    const membersArr = members && Object.values(members)
    const requestsArr = requests && Object.values(requests)

    let component;

    let isMember = false

    membersArr.forEach(mem => {
        if (mem?.id === user) {
            isMember = true
        }
    });

    let isRequested = false
    requestsArr.forEach(req => {
        if (req.user_id === user && req.group_id === group.id) {
            isRequested = true
        }
    });

    const onClose = () => {
        dispatch(getGroupDetails(gId))
        closeModal()
    }

    if (group.owner_id === user) {
        component = (<div>
            <h1>You're the owner of this group already</h1>
            <button onClick={onClose}>close</button>
        </div>)
    } else if (isMember) {
        component = (<div>
            <h1>You're already a member of this group</h1>
            <button onClick={onClose}>close</button>
        </div>)
    } else if(isRequested) {
        component = (<div>
            <h1>Your request has been sent. Please wait for the group owner to accept.</h1>
            <button onClick={onClose}>close</button>
        </div>)
    } else {
        dispatch(joinRequest(user, group?.id))

        component = (<div>
            <h1>Your request has been sent. Please wait for the group owner to accept.</h1>
            <button onClick={onClose}>close</button>
        </div>)
    }

    return (component)
}

export default JoinGroupModal
