import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewGroup } from "../../store/group";
import "./CreateGroupForm.css"

function CreateGroupModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null)
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // console.log("creategroup index.js", image)

        const formData = new FormData()

        formData.append("image", image)

        const res = await fetch('/api/groups/new-gImg', {
            method: 'POST',
            body: formData
        })

        // // console.log("res checker");

        if (res.ok) {
            let url = await res.json()
            let img_url = url.url
            // // console.log("res is all good", img_url);
            dispatch(createNewGroup(name, description, user, img_url))
        }

        closeModal()
    }

    return (
        <div className="new-group">
            <h3>Create Your Group</h3>
            <form action="/posts/new" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
                {errors && errors.length ? (<ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>) : ""}
                <div className="lab">
                    <label>
                        Group Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="lab">
                    <label>
                        Description of your group:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <label>
                    Group Picture
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </label>
                <button className="cart-save-button" type="submit">Save</button>
            </form>
        </div>
    )

}

export default CreateGroupModal
