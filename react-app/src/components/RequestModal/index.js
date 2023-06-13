import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteFromGroups, acceptRequest, deleteRequest } from "../../store/group";
import { useHistory } from "react-router-dom";

function RequestModal({ id, gId, uId, action }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleYes = () => {
        if (action === "accept") {
            dispatch(acceptRequest(id, uId, gId))

            history.push(`/groups/${gId}`)

            closeModal()
        } else {
            dispatch(deleteRequest(id, gId))

            history.push(`/groups/${gId}`)

            closeModal()
        }
    }

    const handleNo = () => {
        closeModal()
    }

    return (
        <div className="modal">
            <h1>Are you sure you would like to {action} this user?</h1>
            <div className="modal-buttons">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>

    )
}

export default RequestModal
