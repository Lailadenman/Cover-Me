import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEventDetails } from "../../store/event"
import { useParams } from "react-router-dom"

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


    return (<>
        <h1>Event Details</h1>
        {isLoaded && event && (
            <>
                <h2>Poster: {event?.owner?.firstName} {event?.owner?.lastName}</h2>
                <h3>Start Time: {event?.start_date}</h3>
                <h3>End Time: {event?.end_date}</h3>
                <h3>Notes: {event?.description}</h3>
                <button>delete event</button>
                <button>update event</button>
            </>
        )}
    </>)
}

export default EventDetails
