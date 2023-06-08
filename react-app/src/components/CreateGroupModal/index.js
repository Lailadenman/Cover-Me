import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewGroup } from "../../store/group";

function CreateGroupModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createNewGroup(name, description, user))

        closeModal()
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <button className="cart-save-button" type="submit">Save</button>
        </form>
    )

}

export default CreateGroupModal
