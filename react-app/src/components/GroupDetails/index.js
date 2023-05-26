import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroupDetails } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Calendar from '../Calendar';

function GroupDetails() {
    const today = new Date()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [month, setMonth] = useState(today.getMonth())
    const [year, setYear] = useState(today.getFullYear())
    const { id } = useParams()

    useEffect(() => {
        dispatch(getGroupDetails(id))
        setIsLoaded(true)
    }, [dispatch])

    const group = useSelector(state => state?.groups?.groupDetails)

    console.log(group && group?.name);

    const handlePastMonth = () => {
        if (month === 0) {
            setYear(year - 1)
            setMonth(12)
        } else {
            setMonth(month - 1)
        }
    }

    const handleNextMonth = () => {
        if (month === 12) {
            setYear(year + 1)
            setMonth(0)
        } else {
            setMonth(month + 1)
        }
    }

    return (
        <div>
            <h1>test</h1>
            {isLoaded && group && (
                <>
                    <h1>{group?.description}</h1>
                    <div>
                        <button onClick={handlePastMonth}><p>{"<"}</p></button>
                        <Calendar year={year} month={month} />
                        <button onClick={handleNextMonth}><p>{">"}</p></button>
                    </div>
                </>
            )}
        </div>
    )
}

export default GroupDetails;
