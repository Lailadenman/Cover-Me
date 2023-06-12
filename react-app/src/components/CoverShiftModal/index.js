import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEvent, editEvent } from '../../store/event';
import { useModal } from '../../context/Modal';

function CoverShiftModal({ startDate, endDate, startTime, endTime }) {
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const user = useSelector(state => state?.session?.user)
    const event = useSelector(state => state?.events?.event_details)

    const handleYes = async (e) => {
        e.preventDefault();

        console.log(event && event);

        const data = dispatch(editEvent(event?.id, event?.description, event?.owner_id, event?.start_date, event?.end_date, event?.group_id, true, user?.id));

        console.log("yes cover hit");
        if (data) {
            setErrors(data);
        }

        closeModal()
    }

    const handleNo = async (e) => {
        closeModal()
    }

    return (
        <div>
            <h1>Would you like to cover this shift?</h1>
            <h2>Start: {startDate} {startTime}</h2>
            <h2>End: {endDate} {endTime}</h2>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>
    )
}
 export default CoverShiftModal
