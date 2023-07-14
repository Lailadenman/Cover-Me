const LOAD_CHATS = "rooms/LOAD_CHATS"
const GET_ROOM = "rooms/GET_ROOM"

// const CREATE_MEMBER = "group/CREATE_MEMBER"
// const ADD_MESSAGE = "groups/ADD_MESSAGE"

// const loadGroups = (list) => ({
//     type: LOAD_GROUPS,
//     list
// })

const loadChats = (messages) => ({
    type: LOAD_CHATS,
    messages
})

const getRoom = (room) => ({
    type: GET_ROOM,
    room
})

export const newChatRoom = (user_id, receiver_id) => async (dispatch) => {
    // console.log("new room made");
    const res = await fetch(`/api/room/${user_id}/${receiver_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })

    // console.log(res.url);

    if (res.ok) {
        const room = await res.json()

        // console.log("here is the room ", room);

        dispatch(getRoom(room))

        // console.log("after checker");
        // // console.log("new message saved");
        // dispatch(getGroupDetails(group_id))
    }
}

export const getRoomId = (rId) => async (dispatch) => {
    const res = await fetch(`/api/users/room/${rId}`)
    console.log("id tester thunk hit");
    // console.log(rId);
    // console.log(res.url);

    if (res.ok) {
        const room = await res.json()

        const mesRes = await fetch(`/api/users/${room.id}/messages`)

        let messages;

        if (mesRes.ok) {
            messages = await mesRes.json()

            // console.log("############", messages);

            // dispatch(loadChats(messages))
        }

        // console.log("@@@@@@@@@@@@@", messages);

        room.chats = messages

        // console.log("room", room);

        dispatch(getRoom(room))
    }
}

export const getRoomById = (user_id, receiver_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/${receiver_id}`)
    // console.log("get room by id thunk hit");
    // console.log(res.url);

    if (res.ok) {
        const room = await res.json()

        const mesRes = await fetch(`/api/users/${room.id}/messages`)

        let messages;

        if (mesRes.ok) {
            messages = await mesRes.json()

            // console.log("############", messages);

            // dispatch(loadChats(messages))
        }

        // console.log("@@@@@@@@@@@@@", messages);

        room.chats = messages

        // console.log("room", room);

        dispatch(getRoom(room))
    }
}

export const getRoomMessages = (room_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${room_id}/messages`)

    if (res.ok) {
        const messages = await res.json()

        dispatch(loadChats(messages))
    }
}

export const newPrivChat = (user_id, room_id, message) => async (dispatch) => {
    console.log("new message sent");
    const res = await fetch(`/api/messages/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            room_id
        })
    })

    if (res.ok) {
        const message = await res.json()
        console.log("new message saved");
        dispatch(getRoomId(room_id))
    }
}

const initialState = {};

export default function roomReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ROOM:
            newState = { ...initialState }

            console.log("GET_ROOM load checker", action.room);

            newState["room"] = action.room

            // newState.room["messages"] = {}

            return newState

        case LOAD_CHATS:
            newState = { ...state }

            // // console.log("this is the store ", action.user);

            newState.room.messages = action.messages

            return newState
        default:
            return state;
    }
}
