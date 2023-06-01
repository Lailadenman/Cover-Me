import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetails } from "../../store/event";
import { useParams } from "react-router-dom";
import EditEventForm from "../EditEventModal";
import OpenModalButton from '../OpenModalButton';
import DeleteEventModal from "../DeleteEventModal";

function EventDetails() {
    const { gId, eId } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        console.log("============", gId, eId)
        dispatch(getEventDetails(gId, eId))
        console.log("******************* dispatched");
        setIsLoaded(true)
    }, [dispatch])

    const event = useSelector(state => state?.events?.event_details)

    const onClick = () => {

    }


    return (<>
        <h1>Event Details</h1>
        {isLoaded && event && (
            <>
                <h2>Poster: {event?.owner?.firstName} {event?.owner?.lastName}</h2>
                <h3>Start Time: {event?.start_date}</h3>
                <h3>End Time: {event?.end_date}</h3>
                <h3>Notes: {event?.description}</h3>
                <OpenModalButton
                    buttonText={"Edit Event"}
                    onItemClick={onClick}
                    modalComponent={<EditEventForm eId={eId} gId={gId} eDescription={event?.description} eStart_date={event?.start_date} eEnd_date={event?.end_date} />}
                />
                <OpenModalButton
                    buttonText={"Delete Event"}
                    onItemClick={onClick}
                    modalComponent={<DeleteEventModal id={event?.id} gId={gId} />}
                />
            </>
        )}
    </>)
}

export default EventDetails
