import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteFromGroups, getGroupDetails } from "../../store/group";
import { useHistory } from "react-router-dom";
import { getEventDetails, removeEvent } from "../../store/event";

function DeleteEventModal({ id, gId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleYes = () => {
        dispatch(removeEvent(gId, id))

        dispatch(getGroupDetails(gId))

        history.push(`/groups/${gId}`)

        closeModal()
    }

    const handleNo = () => {
        closeModal()
    }

    return (
        <div className='modal'>
            <h2>Delete?</h2>
            <div className="modal-buttons">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>

    )
}

export default DeleteEventModal
