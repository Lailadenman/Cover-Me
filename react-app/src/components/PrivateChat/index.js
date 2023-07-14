import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { newChat } from '../../store/group';
import "./PrivateChat.css"
import { getRoomMessages, newPrivChat } from '../../store/chat';

let socket;

function PrivateChat({ rId }) {
    // const groupMessages = useSelector(state => state?.groups?.groupDetails?.messages)
    // const groupMessagesArr = Object.values(groupMessages)
    // const messagesArr = groupMessagesArr.map((mess) => {
    //     return { user: mess.username, msg: mess.message }
    // })
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoomMessages(rId))
        setIsLoaded(true)
    }, [dispatch])

    const privMessages = useSelector(state => state?.currRoom?.room?.messages)
    const privMessagesArr = Object.values(privMessages)
    const messagesArr = privMessagesArr.map((mess) => {
        return { user: mess.username, msg: mess.message}
    })
    const [messages, setMessages] = useState([...messagesArr])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state?.session?.user)
    // const chatRoomId = useSelector(state => state.session.room.id)

    useEffect(() => {
        socket = io();

        // const data = {
        //     "username": user.username,
        //     "room": chatRoomId
        // }

        // socket.on("join", () => {
        //     socket.emit('join', chatRoomId);
        // })

        socket.on("chat", (chat) => {
            dispatch(newPrivChat(user.id, rId, chat.msg))
            setMessages(messages => [...messages, chat])
        })

        return (() => socket.disconnect())
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };


    const sendChat = (e) => {
        e.preventDefault()

        if (chatInput.length > 0) {
            socket.emit("chat", { user: user.username, msg: chatInput });
            setChatInput("")
        }
    }

    return (isLoaded && user && (
        <>
            <div>
                <div>
                    <h1 className='chat-title'>Chat</h1>
                </div>
                <div className='messages'>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
                <div className='button-sect'>
                    <form onSubmit={sendChat}>
                        <input
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                        <button className="send-button" type="submit">Send</button>
                    </form>
                    {/* <button onClick={close}>Close Chat</button> */}
                </div>
            </div>
        </>
    )
    )
}

export default PrivateChat;
