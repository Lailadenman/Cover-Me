const LOAD_GROUPS = "group/LOAD_GROUPS"
const LOAD_GROUP_DETAILS = "group/LOAD_GROUP_DETAILS"
const CREATE_GROUP = "group/CREATE_GROUP"
const UPDATE_GROUP = "group/UPDATE_GROUP"
const DELETE_GROUP = "group/DELETE_GROUP"

const loadGroups = (list) => ({
    type: LOAD_GROUPS,
    list
})

const loadGroupDetails = (group) => ({
    type: LOAD_GROUP_DETAILS,
    group
})

const createGroup = (group) => ({
    type: CREATE_GROUP,
    group
})

const updateGroup = (group) => ({
    type: UPDATE_GROUP,
    group
})

const deleteGroup = (id) => ({
    type: DELETE_GROUP,
    id
})

export const getGroups = () => async (dispatch) => {
    const res = await fetch(`/api/groups/`)
    console.log(res.url);

    if (res.ok) {
        const groups = await res.json()
        console.log(groups);

        dispatch(loadGroups(groups))
    }
}

export const getGroupDetails = (id) => async (dispatch) => {
    console.log("~~~~~~~~~~~~~~~", id);
    const res = await fetch(`/api/groups/${id}`)
    console.log(res.url);
    console.log("------------- HIT");

    if (res.ok) {
        const group = await res.json()
        console.log("@@@@@@@@@@@res.ok", group)

        dispatch(loadGroupDetails(group))
    }
}

export const createNewGroup = (name, description, owner_id) => async (dispatch) => {
    const res = await fetch('/api/groups/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                owner_id
            }),
        })

    if(res.ok){
        const group = await res.json()
        console.log(group);

        dispatch(createGroup(group))
    }
}

export const editGroup = (name, description, owner_id, group_id) => async (dispatch) => {
    const res = await fetch(`/api/groups/${group_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                owner_id
            }),
        })

        console.log("received from by store:", name, description, owner_id, group_id);

    if(res.ok){
        const group = await res.json()
        console.log(group);

        dispatch(updateGroup(group))
    }
}

export const deleteFromGroups = (id) => async (dispatch) => {
    // console.log("~~~~~~~~~~~~~~~", id);
    const res = await fetch(`/api/groups/${id}`, {
        method: 'DELETE'
    })
    // console.log(res.url);
    // console.log("------------- HIT");

    if (res.ok) {
        const group = await res.json()
        // console.log("@@@@@@@@@@@res.ok", group)

        dispatch(deleteGroup(group.id))
    }
}

const initialState = {};

export default function groupReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_GROUPS:
            newState = { ...initialState }

            action.list.forEach((group) => {
                newState[group.id] = group
            })

            console.log(newState);

            return newState;

        case LOAD_GROUP_DETAILS:
            newState = { ...state }

            console.log(action.group);

            newState.groupDetails = action.group

            return newState

        case CREATE_GROUP:
            newState = {...state}

            newState[action.group.id] = action.group

            return newState

        case UPDATE_GROUP:
            newState = {...state}

            newState[action.group.id] = action.group

            return newState

        case DELETE_GROUP:
            newState = {...state}

            delete newState[action.id]

            return newState

        default:
            return state;
    }
}
