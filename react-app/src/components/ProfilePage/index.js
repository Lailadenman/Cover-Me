import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../../store/users"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { getRoomById, newChatRoom } from "../../store/chat"
import PrivateChat from "../PrivateChat"

function ProfilePage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user.id)
    const { id } = useParams()

    console.log("user id is", id);

    useEffect(() => {
        dispatch(getRoomById(user, id))
        dispatch(getUserInfo(id))
        setIsLoaded(true)
        console.log("useEffect ran");
    }, [dispatch])

    const chatRoom = useSelector(state => state?.currRoom?.room)

    console.log(chatRoom && chatRoom);

    let haveChatted = true

    let room;

    if(chatRoom && chatRoom.message) {
        console.log("they have never talked");
        haveChatted = false
    } else {
        room = chatRoom && chatRoom?.room
    }

    const [isNew, setIsNew] = useState(!haveChatted)

    // useEffect(() => {
    //     dispatch(getUserInfo(id))
    //     setIsLoaded(true)
    // }, [dispatch])

    const profUser = useSelector(state => state.currUser.userProf)

    console.log(profUser && profUser, "This should be the first name");

    let rm;

    const handleStart = () => {
        dispatch(newChatRoom(user, id))
        // console.log(`new room is `, rm);
        setIsNew(false)
    }

    // const room = useSelector(state => state?.currRoom?.room)

    console.log(room && room);

    let cName = isNew ? "chat-sect hidden" : "chat-sect"

    console.log("current class is ", cName);

    return (
        <>
            {isLoaded && (<div>
                {profUser && (<div>
                    Profile for {profUser && profUser?.firstName}
                </div>)}
                {room && (<div className={cName}>
                    <PrivateChat rId={room.id} />
                </div>)}
                {isNew ? (<button onClick={handleStart}>Start Conversation</button>) : ""}
            </div>)}
        </>
    )
}

export default ProfilePage;
