import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetails } from "../../store/event";
import { useHistory, useParams } from "react-router-dom";
import EditEventForm from "../EditEventModal";
import OpenModalButton from '../OpenModalButton';
import DeleteEventModal from "../DeleteEventModal";
import CoverShiftModal from "../CoverShiftModal";
import "./EventDetails.css"

function EventDetails() {
    const { gId, eId } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()


    useEffect(() => {
        // // console.log("============", gId, eId)
        dispatch(getEventDetails(gId, eId))
        // // console.log("******************* dispatched");
        setIsLoaded(true)
    }, [dispatch])

    const event = useSelector(state => state?.events?.event_details)
    const user = useSelector(state => state?.session?.user?.id)

    const start_dateArr = event?.start_date.split(" ")
    const startTime = event && start_dateArr[1].split(":")
    const startDateArr = event && start_dateArr[0].split("-")
    const startDate = event && startDateArr[1] + "/" + startDateArr[2] + "/" + startDateArr[0]
    // // console.log(startDate);

    const end_dateArr = event?.end_date.split(" ")
    const endTime = event && end_dateArr[1].split(":")
    const endDateArr = event && end_dateArr[0].split("-")
    const endDate = event && endDateArr[1] + "/" + endDateArr[2] + "/" + endDateArr[0]
    // // console.log(endDate);

    const start = event && (parseInt(startTime[0]) > 12 ? `${(parseInt(startTime[0]) - 12)}:${startTime[1]}pm` : parseInt(startTime[0]) < 12 ? `${parseInt(startTime[0])}:${startTime[1]}am` : `${parseInt(startTime[0])}:${startTime[1]}pm`)
    const end = event && (parseInt(endTime[0]) > 12 ? `${(parseInt(endTime[0]) - 12)}:${endTime[1]}pm` : parseInt(endTime[0]) < 12 ? `${parseInt(endTime[0])}:${endTime[1]}am` : `${parseInt(endTime[0])}:${endTime[1]}pm`)
    // // console.log(start, end);

    const onClick = () => {

    }

    const handleBack = () => {
        history.push(`/groups/${gId}`)
    }

    return (<>
        <button className="back-button" onClick={handleBack}>Back to your group</button>
        {isLoaded && event && (
            <div className="event-details">
                <h1>Event Details</h1>
                <div className="event-info">
                    <h2>Poster: {event?.owner?.firstName} {event?.owner?.lastName}</h2>
                    <h3>Start Time: {`${startDate} ${start}`}</h3>
                    <h3>End Time: {`${endDate} ${end}`}</h3>
                    <h3>Notes: {event?.description}</h3>
                    <h3>Covered: {event?.isCovered ? "Yes" : "No"}</h3>
                    {event?.isCovered && (<h3>Covered By: {event?.coveredBy.firstName} {event?.coveredBy.lastName}</h3>)}
                </div>
                <div className={event.owner_id === user ? "event-buttons" : "hidden"}>
                    <OpenModalButton
                        buttonText={"Edit Event"}
                        // onItemClick={onClick}
                        modalComponent={<EditEventForm eId={eId} gId={gId} eDescription={event?.description} eStart_date={event?.start_date} eEnd_date={event?.end_date} />}
                    />
                    <OpenModalButton
                        buttonText={"Delete Event"}
                        // onItemClick={onClick}
                        modalComponent={<DeleteEventModal id={event?.id} gId={gId} />}
                    />
                </div>
                <div className={event.owner_id === user ? "hidden" : "cover-button"}>
                    <OpenModalButton
                        buttonText={"Cover Shift"}
                        modalComponent={<CoverShiftModal startDate={startDate} endDate={endDate} startTime={start} endTime={end} />}
                    />
                </div>
            </div>
        )}
    </>)
}

export default EventDetails
