import { useEffect, useRef, useState } from 'react';
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
import "./GroupDetails.css"
import { joinRequest } from "../../store/group";

function GroupDetails() {
    const today = new Date()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [month, setMonth] = useState(today.getMonth())
    const [year, setYear] = useState(today.getFullYear())
    const { id } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const [showChatMenu, setShowChatMenu] = useState(false);
    const [showMemberMenu, setShowMemberMenu] = useState(false);
    const [showRequestMenu, setShowRequestMenu] = useState(false);
    const ulRef = useRef()

    useEffect(() => {
        dispatch(getGroupDetails(id))
        dispatch(getEvents(id))
        setIsLoaded(true)
    }, [dispatch])

    const sessionUser = useSelector(state => state?.session?.user)
    const user = useSelector(state => state?.session?.user?.id)
    const group = useSelector(state => state?.groups?.groupDetails)
    const events = useSelector(state => state?.events)
    const members = group?.members
    const requests = group?.requests
    // const groupPic = group?.groupPic

    const eventsArr = Object.values(events)
    const membersArr = members && Object.values(members)
    const requestsArr = requests && Object.values(requests)

    // // console.log("from group deatils", eventsArr);

    // // console.log(group && group?.name);

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

    const onJoin = () => {
        dispatch(joinRequest(user, group?.id))
        dispatch(getGroupDetails(group?.id))
    }

    //     let isRequested = false
    //     // console.log("join clicked");
    //     requestsArr.forEach(req => {
    //         if(req.user_id === user && req.group_id === id) {
    //             isRequested = true
    //         }
    //     });

    //     if(!isRequested && !isMember && (group.owner_id !== user)) {

    //         dispatch(joinRequest(user, id))
    //     }
    // }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const openChatMenu = () => {
        if (showChatMenu) return;
        setShowChatMenu(true);
    };

    const openMemberMenu = () => {
        if (showMemberMenu) return;
        setShowMemberMenu(true);
    };

    const openRequestMenu = () => {
        if (showRequestMenu) return;
        setShowRequestMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        if (!showChatMenu) return;

        // const closeMenu = (e) => {
        //     if (!ulRef.current.contains(e.target)) {
        //         setShowChatMenu(false);
        //     }
        // };

        // document.addEventListener("click", closeMenu);

        // return () => document.removeEventListener("click", closeMenu);
    }, [showChatMenu]);

    useEffect(() => {
        if (!showMemberMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMemberMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMemberMenu]);

    useEffect(() => {
        if (!showRequestMenu) return;

        const closeMenu = (e) => {
            // // console.log("e.target checker", e.target.id);
            if (!ulRef.current.contains(e.target)) {
                setShowRequestMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [ulRef, showRequestMenu]);

    const closeChatMenu = () => {
        setShowChatMenu(false)
    }

    const ulClassName = "group-info-content content" + (showMenu ? " show" : "");
    const chatClassName = "chat-dropdown-content content" + (showChatMenu ? " show" : "");
    const memberClassName = "member-dropdown-content content" + (showMemberMenu ? " show" : "");
    const requestClassName = "request-dropdown-content content" + (showRequestMenu ? " show" : "");

    let isRequested = false
    requestsArr?.forEach(req => {
        if (req.user_id === user && req.group_id === group.id) {
            isRequested = true
        }
    });

    const isOwner = group?.owner_id === user

    // // console.log("pic url ", group && group.pic);

    const banner = group && group.pic

    return (
        <div className='all'>
            {/* <div className='group-header' style={{backgroundImage: `url(${banner})`}}><h1>{isLoaded && group && (group?.name)}</h1></div> */}
            <h1>{isLoaded && group && (group?.name)}</h1>
            {isMember ? (<div className='group-details'>
                {isLoaded && group && (
                    <>
                        {/* <img src={banner}></img> */}
                        <div className='left-side'>
                            <div className='dropdowns'>
                                <div className='group-info-dropdown dropdown'>
                                    <button className='dropdown-button' onClick={openMenu}>
                                        Group info <i class="fa-solid fa-caret-down"></i>
                                    </button>
                                    <div className={ulClassName} ref={ulRef}>
                                        <h2>Owner: {group?.owner}</h2>
                                        <h2>Description: {group?.description}</h2>
                                    </div>
                                </div>
                                {isMember && (<div className='chat-dropdown dropdown'>
                                    <button className='dropdown-button' onClick={openChatMenu}>
                                        Messages <i class="fa-solid fa-caret-down"></i>
                                    </button>
                                    <div className={chatClassName} ref={ulRef}>
                                        <Chat gId={group.id} cName={isMember ? "chat-area" : "hidden"} close={closeChatMenu} />
                                        {/* <button onClick={closeChatMenu}>Close Chat</button> */}
                                    </div>
                                </div>)}
                                <div className='member-list-dropdown dropdown'>
                                    <button className='dropdown-button' onClick={openMemberMenu}>
                                        Members <i class="fa-solid fa-caret-down"></i>
                                    </button>
                                    <div id='members' className={memberClassName} ref={ulRef}>
                                        <h1 className='title'>List of Members</h1>
                                        {members && membersArr.map((member) => {
                                            return (
                                                <div id='member-link-div'>
                                                    <h2><NavLink exact to={`/profile/${member?.user?.id}`} id="member-link">{member?.user?.firstName} {member?.user?.lastName}</NavLink></h2>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {isOwner && (<div className='requests-dropdown dropdown'>
                                    <button className='dropdown-button' onClick={openRequestMenu}>
                                        Requests <i class="fa-solid fa-caret-down"></i>
                                    </button>
                                    <div className={requestClassName} ref={ulRef}>
                                        <h1 className='title'>List of Requests</h1>
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
                                </div>)}
                            </div>
                            <div className='buttons'>
                                {isMember && (<div id='eventButton' className={isMember ? "" : "hidden"}>
                                    <OpenModalButton
                                        buttonText={"Create Event"}
                                        onItemClick={onClick}
                                        modalComponent={<CreateEventForm gId={id} />}
                                    />
                                </div>)}
                                {isRequested ? (<p>Your request has already been send</p>) : (<div id='joinButton' className={!isMember ? "" : "hidden"}>
                                    <button onClick={onJoin}>Join</button>
                                </div>)}
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
                            </div>
                        </div>
                        <div className='right-side'>
                            <div className='calendar-sect'>
                                <div className={isMember ? "calendar-area" : "hidden"}>
                                    <button className='cal-buttons' onClick={handlePastMonth}><p>{"<"}</p></button>
                                    <Calendar year={year} month={month} gId={id} eventList={events && eventsArr} />
                                    <button className='cal-buttons' onClick={handleNextMonth}><p>{">"}</p></button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>) : (<div>
                <h2>Owner: {group?.owner}</h2>
                <h2>{group?.description}</h2>
                {isRequested ? (<p>Your request to join has already been send</p>) : (<div id='joinButton' className={!isMember ? "" : "hidden"}>
                    <button onClick={onJoin}>Join</button>
                </div>)}
            </div>)}
        </div>
    )
}

export default GroupDetails;
