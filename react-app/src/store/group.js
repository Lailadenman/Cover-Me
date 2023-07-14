const LOAD_GROUPS = "group/LOAD_GROUPS"
const LOAD_GROUPS_BY_USER = "group/LOAD_GROUPS_BY_USER"
const LOAD_GROUP_DETAILS = "group/LOAD_GROUP_DETAILS"
const CREATE_GROUP = "group/CREATE_GROUP"
const UPDATE_GROUP = "group/UPDATE_GROUP"
const DELETE_GROUP = "group/DELETE_GROUP"
const CREATE_MEMBER = "group/CREATE_MEMBER"
// const ADD_MESSAGE = "groups/ADD_MESSAGE"

const loadGroups = (list) => ({
    type: LOAD_GROUPS,
    list
})

const loadGroupsByUser = (list) => ({
    type: LOAD_GROUPS_BY_USER,
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

const createMember = (member) => ({
    type: CREATE_MEMBER,
    member
})

// const addMessage = (message) => ({
//     type: ADD_MESSAGE,
//     message
// })

export const getGroups = () => async (dispatch) => {
    const res = await fetch(`/api/groups/`)
    console.log(res.url);

    if (res.ok) {
        const groups = await res.json()
        console.log(groups);

        dispatch(loadGroups(groups))
    }
}

export const getGroupsByUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/groups`)
    console.log("groups by users hit");

    if (res.ok) {
        const groups = await res.json()

        console.log("##############", groups);

        dispatch(loadGroupsByUser(groups))
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
        // console.log("=================", group.members);

        dispatch(loadGroupDetails(group))
    }
}



export const createNewGroup = (name, description, owner_id, img_url) => async (dispatch) => {
    // console.log("%%%%%%%%%%%%%%%%%%%%", groupPic.get("groupPic"));
    console.log("^^^^^^^^^^^^^^^^^^^", name, description, img_url);
    const res = await fetch('/api/groups/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                owner_id,
                img_url
            }),
        })

    // console.log(res.body);

    if (res.ok) {
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

    if (res.ok) {
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

export const deleteRequest = (id, gId) => async (dispatch) => {
    const res = await fetch(`/api/grouprequests/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const group = await res.json()
        // console.log("@@@@@@@@@@@res.ok", group)

        getGroupDetails(gId)
    }
}

export const acceptRequest = (id, uId, gId) => async (dispatch) => {
    console.log("hit acceptReq", id, uId, gId);
    const res = await fetch(`/api/groupmembers/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (res.ok) {
        const newMem = await res.json()

        console.log("here's our new member", newMem);
        getGroupDetails(gId)
    }
}

export const joinRequest = (uId, gId) => async (dispatch) => {
    console.log("joinRequest hit");
    const res = await fetch(`/api/grouprequests/${uId}/${gId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (res.ok) {
        const newReq = await res.json()
        console.log("waiting for request to be added");
        getGroupDetails(gId)
    }
}

// Possibly treat loading messages/chats like requests and just straight up add them
// when we fetch the group details and then for new messages use this thunk
export const newChat = (user_id, group_id, message) => async (dispatch) => {
    console.log("new message sent");
    const res = await fetch(`/api/messages/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            group_id
        })
    })

    if (res.ok) {
        const message = res.json()
        console.log("new message saved");
        dispatch(getGroupDetails(group_id))
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

        case LOAD_GROUPS_BY_USER:
            newState = { ...initialState }

            newState["myGroups"] = {}

            action.list.forEach((group) => {
                newState.myGroups[group.id] = group
            })

            console.log(newState);

            return newState;
        case LOAD_GROUP_DETAILS:
            newState = { ...state }

            console.log("Load details", action.group);

            newState.groupDetails = action.group

            return newState

        case CREATE_GROUP:
            newState = { ...state }

            newState[action.group.id] = action.group

            return newState

        case UPDATE_GROUP:
            newState = { ...state }

            newState[action.group.id] = action.group

            return newState

        case DELETE_GROUP:
            newState = { ...state }

            delete newState[action.id]

            return newState
        default:
            return state;
    }
}
