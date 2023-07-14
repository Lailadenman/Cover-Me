const LOAD_EVENTS = "events/LOAD_EVENTS"
const LOAD_EVENT_DETAILS = "events/LOAD_EVENT_DETAILS"
const CREATE_EVENT = "events/CREATE_EVENT"
const UPDATE_EVENT = "events/UPDATE_EVENT"
const DELETE_EVENT = "events/DELETE_EVENT"


const loadEvents = (list) => ({
    type: LOAD_EVENTS,
    list
})

const loadEventDetails = (shift) => ({
    type: LOAD_EVENT_DETAILS,
    shift
})

const createEvent = (shift) => ({
    type: CREATE_EVENT,
    shift
})

const updateEvent = (shift) => ({
    type: UPDATE_EVENT,
    shift
})

const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    id
})

export const getEvents = (gId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${gId}/events`)

    if (res.ok) {
        const list = await res.json()

        // console.log(list);

        dispatch(loadEvents(list))
    }
}

export const getEventDetails = (gId, id) => async (dispatch) => {
    // console.log("get event details hit");
    const res = await fetch(`/api/groups/${gId}/events/${id}`)

    if (res.ok) {
        const shift = await res.json()

        // // console.log();
        dispatch(loadEventDetails(shift))
    }
}

export const createNewEvent = (description, owner_id, start_date, end_date, gId) => async (dispatch) => {
    // console.log("hit createNewEvent");
    const res = await fetch(`/api/groups/${gId}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description,
            owner_id,
            start_date,
            end_date,
            group_id: gId,
        }),
    })

    if (res.ok) {
        const newEvent = await res.json()

        dispatch(createEvent(newEvent))
    }
}

export const editEvent = (id, description, owner_id, start_date, end_date, gId, isCovered, coveredBy) => async (dispatch) => {
    // // console.log("editEvetnt thunk hit");
    // console.log(id, description, owner_id, start_date, end_date, gId, isCovered, coveredBy);
    const res = await fetch(`/api/groups/${gId}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description,
            owner_id,
            start_date,
            end_date,
            group_id: gId,
            isCovered,
            coveredBy
        }),
    })

    if (res.ok) {
        const editedEvent = await res.json()

        dispatch(updateEvent(editedEvent))
    }
}

export const removeEvent = (gId, id) => async (dispatch) => {
    const res = await fetch(`/api/groups/${gId}/events/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deletedEvent = await res.json()

        dispatch(deleteEvent(deletedEvent.id))
    }
}

const initialState = {};

export default function eventReducer(state = initialState, action) {
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
