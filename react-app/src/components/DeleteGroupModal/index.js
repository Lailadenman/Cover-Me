import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteFromGroups } from "../../store/group";
import { useHistory } from "react-router-dom";

function DeleteGroupModal({ id }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleYes = () => {
        dispatch(deleteFromGroups(id))

        history.push("/groups")

        closeModal()
    }

    const handleNo = () => {
        closeModal()
    }

    return (
        <div className="modal">
            <h1>Are you sure you want to delete this group?</h1>
            <div className="modal-buttons">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>

    )
}

export default DeleteGroupModal
