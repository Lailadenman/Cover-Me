import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteFromGroups, acceptRequest, deleteRequest, getGroupDetails } from "../../store/group";
import { useHistory } from "react-router-dom";
import "./RequestModal.css"

function RequestModal({ id, gId, uId, action }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleYes = () => {
        if (action === "accept") {
            dispatch(acceptRequest(id, uId, gId))

            dispatch(getGroupDetails(gId))

            closeModal()

            history.push(`/groups/${gId}`)
        } else {
            dispatch(deleteRequest(id, gId))

            dispatch(getGroupDetails(gId))

            history.push(`/groups/${gId}`)

            closeModal()
        }
    }

    const handleNo = () => {
        closeModal()
    }

    return (
        <div className="modal">
            <h2>Are you sure you would like to {action} this user?</h2>
            <div className="modal-buttons">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>

    )
}

export default RequestModal
