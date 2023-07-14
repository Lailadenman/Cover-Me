const CREATE_MEMBER = "members/CREATE_MEMBER"
const DELETE_MEMBER = "members/DELETE_MEMBER"

const createMember = (member) => ({
    type: CREATE_MEMBER,
    member
})

const deleteRequest = (id) => ({
    type: DELETE_MEMBER,
    id
})

export const acceptRequest = (id, uId, gId) => async (dispatch) => {
    // console.log("hit createNewEvent");
    const res = await fetch(`/api/group_requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: uId,
            group_id: gId,
            id
        }),
    })

    if (res.ok) {
        const newMem = await res.json()

        dispatch(createMember(newMem))
    }
}

export const declineRequest = (id) => async (dispatch) => {
    const res = await fetch(`/api/groups/${gId}/events/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deletedEvent = await res.json()

        dispatch(deleteEvent(deletedEvent.id))
    }
}

const initialState = {};

export default function memberReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_EVENTS:
            newState = { ...initialState }

            action.list.forEach(event => {
                newState[event.id] = event
            });

            return newState

        case LOAD_EVENT_DETAILS:
            newState = { ...state }

            newState.event_details = action.shift

            return newState

        case CREATE_EVENT:
            newState = { ...state }

            newState[action.shift.id] = action.shift

            return newState

        case UPDATE_EVENT:
            newState = { ...state }

            newState[action.shift.id] = action.shift

            newState.event_details = action.shift

            return newState

        case DELETE_EVENT:
            newState = { ...state }

            delete newState[action.id]

            return newState

        default:
            return state;
    }
}
