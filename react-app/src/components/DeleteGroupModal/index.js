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
        <div>
            <h1>Delete?</h1>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>

    )
}

export default DeleteGroupModal
