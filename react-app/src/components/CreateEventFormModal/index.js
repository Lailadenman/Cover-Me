import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEvent } from '../../store/event';
import { useModal } from '../../context/Modal';

function CreateEventForm({ gId }) {
    const date = new Date
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    console.log(dateStr);
    const [start_date, setStart_Date] = useState(dateStr)
    const [end_date, setEnd_Date] = useState(dateStr)
    const [description, setDescription] = useState("")
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

        const data = await dispatch(createNewEvent(description, user.id, start, end, gId));

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
                onChange={(e) => {
                    setStart_Date(e.target.value)
                    setEnd_Date(e.target.value)
                }}
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

export default CreateEventForm
