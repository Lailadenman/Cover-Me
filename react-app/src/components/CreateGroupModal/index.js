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
    const [image, setImage] = useState(null)
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image)

        // const formData = new FormData()

        // formData.append("name", name)
        // formData.append("description", description)
        // formData.append("owner_id", user)
        // formData.append("groupPic", image, image.name)

        // for (const pair of formData.entries()) {
        //     console.log(`@@@@@@@@@@@@@@@@@${pair[0]}, ${pair[1]}`);
        // }

        // console.log("#############", formData.get("groupPic"));

        dispatch(createNewGroup(name, description, user))

        closeModal()
    }

    return (
        <div className="new-group">
            <form action="/posts/new" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
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
                {/* <label>
                Group Picture
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </label> */}
                <button className="cart-save-button" type="submit">Save</button>
            </form>
        </div>
    )

}

export default CreateGroupModal
