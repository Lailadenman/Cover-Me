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
import RequestModal from '../RequestModal';
import JoinGroupModal from '../JoinGroupModal';
import Chat from '../Chat';

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

    const user = useSelector(state => state?.session?.user?.id)
    const group = useSelector(state => state?.groups?.groupDetails)
    const events = useSelector(state => state?.events)
    const members = group?.members
    const requests = group?.requests

    const eventsArr = Object.values(events)
    const membersArr = members && Object.values(members)
    const requestsArr = requests && Object.values(requests)

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

    let isMember = false
    membersArr?.forEach(mem => {
        if (mem.user_id === user) {
            isMember = true
        }
    })

    // const onJoin = () => {
    //     let isMember = false
    //     membersArr.forEach(mem => {
    //         if(mem.user_id === user) {
    //             isMember = true
    //         }
    //     })

    //     let isRequested = false
    //     console.log("join clicked");
    //     requestsArr.forEach(req => {
    //         if(req.user_id === user && req.group_id === id) {
    //             isRequested = true
    //         }
    //     });

    //     if(!isRequested && !isMember && (group.owner_id !== user)) {

    //         dispatch(joinRequest(user, id))
    //     }
    // }



    return (
        <div>
            <h1>{isLoaded && group && (group?.name)}</h1>
            {isLoaded && group && (
                <>
                    <div className='groupInfo'>
                        <h1>Owner: {group?.owner}</h1>
                        <h1>{group?.description}</h1>
                    </div>
                    <Chat gId={group.id} cName={isMember ? "calendar" : "hidden"}/>
                    <div id='members'>
                        <h1>List of Members</h1>
                        {members && membersArr.map((member) => {
                            return (
                                <div>
                                    <h2>{member?.user?.firstName} {member?.user?.lastName}</h2>
                                </div>
                            )
                        })}
                    </div>
                    <div className={group.owner_id === user ? "requests" : "hidden"}>
                        <h1>List of Requests</h1>
                        {requests && requestsArr.map((request) => {
                            return (
                                <div>
                                    <h2>{request?.user?.firstName} {request?.user?.lastName}</h2>
                                    <OpenModalButton
                                        buttonText={"Accept"}
                                        onItemClick={onClick}
                                        modalComponent={<RequestModal id={request?.id} gId={id} uId={request.user_id} action={"accept"} />}
                                    />
                                    <OpenModalButton
                                        buttonText={"Decline"}
                                        onItemClick={onClick}
                                        modalComponent={<RequestModal id={request?.id} gId={id} uId={request.user_id} action={"decline"} />}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className={isMember ? "calendar" : "hidden"}>
                        <button onClick={handlePastMonth}><p>{"<"}</p></button>
                        <Calendar year={year} month={month} gId={id} eventList={events && eventsArr} />
                        <button onClick={handleNextMonth}><p>{">"}</p></button>
                    </div>
                    <div id='eventButton' className={isMember ? "" : "hidden"}>
                        <OpenModalButton
                            buttonText={"Create Event"}
                            onItemClick={onClick}
                            modalComponent={<CreateEventForm gId={id} />}
                        />
                    </div>
                    <div id='joinButton' className={!isMember ? "" : "hidden"}>
                        <OpenModalButton
                            buttonText={"Join"}
                            onItemClick={onClick}
                            modalComponent={<JoinGroupModal gId={id} uId={user} />}
                        />
                    </div>
                    <div id='groupButtons' className={group.owner_id === user ? "" : "hidden"}>
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
                    </div>
                </>
            )}
        </div>
    )
}

export default GroupDetails;
