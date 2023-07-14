import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../../store/users"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { getRoomById, getRoomMessages, newChatRoom } from "../../store/chat"
import PrivateChat from "../PrivateChat"

function ProfilePage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    // const [isReady, setIsReady] = useState(false)
    const user = useSelector(state => state?.session?.user?.id)
    const { id } = useParams()

    console.log("user id is", id);

    useEffect(() => {
        dispatch(getRoomById(user, id))
        dispatch(getUserInfo(id))
        setIsLoaded(true)
        console.log("useEffect ran");
    }, [dispatch])

    const chatRoom = useSelector(state => state?.currRoom?.room)

    console.log(isLoaded && chatRoom);

    let haveChatted = true

    let roomId = chatRoom?.id

    if(chatRoom && chatRoom.Message) {
        console.log("they have never talked");
        haveChatted = false
        // setIsReady(true)
    } else {
        console.log(chatRoom);
        // console.log(room?.id);
        // const testId = chatRoom.id
        // console.log(testId);
        // dispatch(getRoomMessages(chatRoom && chatRoom?.id))
        // setIsReady(true)
    }

    const test = !haveChatted

    console.log(test);

    const [isNew, setIsNew] = useState(!haveChatted ? true : false)

    console.log("they've talked ", isNew);

    // useEffect(() => {
    //     dispatch(getUserInfo(id))
    //     setIsLoaded(true)
    // }, [dispatch])

    const profUser = useSelector(state => state.currUser.userProf)

    console.log(profUser && profUser, "This should be the first name");

    let rm;

    const handleStart = () => {
        dispatch(newChatRoom(user, id))
        // console.log(`new room is `, rm)
        setIsNew(false)
    }

    // useEffect(() => {
    //     setIsNew(false)
    // }, [])

    const rRoom = useSelector(state => state?.currRoom?.room)

    console.log(rRoom && rRoom);

    let cName = isNew ? "chat-sect hidden" : "chat-sect"

    console.log("current class is ", cName);

    return (
        <>
            {isLoaded && (<div>
                {profUser && (<div>
                    Profile for {profUser && profUser?.firstName}
                </div>)}
                {rRoom && (<div className={cName}>
                    <PrivateChat rId={rRoom.id} />
                </div>)}
                {isNew ? (<button onClick={handleStart}>Start Conversation</button>) : ""}
            </div>)}
        </>
    )
}

export default ProfilePage;
