import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEvent, editEvent } from '../../store/event';
import { useModal } from '../../context/Modal';

function EditEventForm({ eId, gId, eDescription, eStart_date, eEnd_date }) {
    const [start_date, setStart_Date] = useState(eStart_date.split(" ").join("T").slice(0, 16))
    const [end_date, setEnd_Date] = useState(eEnd_date.split(" ").join("T").slice(0, 16))
    const [description, setDescription] = useState(eDescription)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const user = useSelector(state => state?.session?.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Date values come in the format of YYYY-MM-DDThh:mm

        const start = start_date.split("T").join(" ") + ":00"
        const end = end_date.split("T").join(" ") + ":00"

        console.log("~~~~~~~~~~~~~", start);

        const data = await dispatch(editEvent(eId, description, user.id, start, end, gId));

        if (data) {
            setErrors(data);
        }

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
                description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Start Date
                <input
                type='datetime-local'
                value={start_date}
                onChange={(e) => setStart_Date(e.target.value)}
                required
                />
            </label>
            <label>
                End Date
                <input
                type='datetime-local'
                value={end_date}
                onChange={(e) => setEnd_Date(e.target.value)}
                required
                />
            </label>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default EditEventForm
