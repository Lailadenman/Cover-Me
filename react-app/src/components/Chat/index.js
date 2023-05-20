import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'

let socket;

function Chat() {
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user)
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
            setMessages(messages => [...messages, chat])
        })

        return (() => socket.disconnect())
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };


    const sendChat = (e) => {
        e.preventDefault()

        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")
    }

    return (user && (
        <>
        <h1>Tester</h1>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
        </>
    )
    )
}

export default Chat;
