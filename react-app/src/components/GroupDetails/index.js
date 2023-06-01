import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroupDetails } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Calendar from '../Calendar';
import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../EditGroupModal';
import DeleteGroupModal from '../DeleteGroupModal';
import { getEvents } from '../../store/event';
import CreateEventForm from '../CreateEventFormModal';

function GroupDetails() {
    const today = new Date()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [month, setMonth] = useState(today.getMonth())
    const [year, setYear] = useState(today.getFullYear())
    const { id } = useParams()

    useEffect(() => {
        dispatch(getGroupDetails(id))
        dispatch(getEvents(id))
        setIsLoaded(true)
    }, [dispatch])

    const group = useSelector(state => state?.groups?.groupDetails)
    const events = useSelector(state => state?.events)

    const eventsArr = Object.values(events)

    console.log("from group deatils", eventsArr);

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

    const onClick = () => {

    }

    return (
        <div>
            <h1>{isLoaded && group && (group?.name)}</h1>
            {isLoaded && group && (
                <>
                    <h1>{group?.description}</h1>
                    <div className='calendar'>
                        <button onClick={handlePastMonth}><p>{"<"}</p></button>
                        <Calendar year={year} month={month} gId={id} eventList={events && eventsArr}/>
                        <button onClick={handleNextMonth}><p>{">"}</p></button>
                    </div>
                    <div>
                        <h1>List of Events</h1>
                        {events && eventsArr.map((event) => {
                            return <NavLink
                                key={event?.id}
                                to={`/groups/${id}/events/${event?.id}`}
                                style={{ textDecoration: "none" }}
                                className="event-link"
                            >
                                <h1>{event.description}</h1>
                                <h2>{event.start_date}</h2>
                                <h2>{event.end_date}</h2>
                            </NavLink>
                        })}
                        <OpenModalButton
                        buttonText={"Create Event"}
                        onItemClick={onClick}
                        modalComponent={<CreateEventForm gId={id}/>}
                        />
                    </div>
                    <OpenModalButton
                        buttonText={"Edit Group"}
                        onItemClick={onClick}
                        modalComponent={<EditGroupModal gName={group?.name} gDescription={group?.description} gId={id} />}
                    />
                    <OpenModalButton
                        buttonText={"Delete Group"}
                        onItemClick={onClick}
                        modalComponent={<DeleteGroupModal id={id} />}
                    />
                </>
            )}
        </div>
    )
}

export default GroupDetails;
