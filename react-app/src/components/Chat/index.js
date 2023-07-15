import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { newChat } from '../../store/group';
import "./Chat.css"

let socket;

function Chat({ gId, cName, close }) {
    const groupMessages = useSelector(state => state?.groups?.groupDetails?.messages)
    const groupMessagesArr = Object.values(groupMessages)
    const messagesArr = groupMessagesArr.map((mess) => {
        return { user: mess.username, msg: mess.message }
    })
    const [messages, setMessages] = useState([...messagesArr])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
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
            dispatch(newChat(user.id, gId, chat.msg))
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

    return (user && (
        <>
            <div className={cName}>
                <div className='chat-header'>
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
                            placeholder='Type a message...'
                            onChange={updateChatInput}
                        />
                        <button className="send-button" type="submit">Send</button>
                    </form>
                    <button onClick={close}>Close Chat</button>
                </div>
            </div>
        </>
    )
    )
}

export default Chat;
