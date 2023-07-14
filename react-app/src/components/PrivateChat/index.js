import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { newChat } from '../../store/group';
import "./PrivateChat.css"
import { getRoomId, getRoomMessages, newPrivChat } from '../../store/chat';

let socket;

function PrivateChat({ rId }) {
    const privMessages = useSelector(state => state?.currRoom?.room?.chats)
    const privMessagesArr = privMessages && Object.values(privMessages)
    const messagesArr = privMessages && privMessagesArr.map((mess) => {
        return { user: mess.username, msg: mess.message }
    })
    const [messages, setMessages] = useState(privMessages ? [...messagesArr] : [])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state?.session?.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    // // console.log(messagesArr);
    // // console.log(messages);
    // // console.log(test);

    // useEffect(() => {
    //     setMessages([...messagesArr])
    // }, [messagesArr])

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
            // dispatch(getRoomId(rId))
            setMessages(messages => [...messages, chat])
        })

        return (() => socket.disconnect())
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };


    const sendChat = (e) => {
        e.preventDefault()
        console.log("send button clicked");

        if (chatInput.length > 0) {
            socket.emit("chat", { user: user.username, msg: chatInput });
            setChatInput("")
        }
    }

    return (user && (
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
