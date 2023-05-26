const LOADGROUPS = "group/LOADGROUPS"
const LOADGROUPDETAILS = "group/LOADGROUPDETAILS"

const loadGroups = (list) => ({
    type: LOADGROUPS,
    list
})

const loadGroupDetails = (group) => ({
    type: LOADGROUPDETAILS,
    group
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

// export const createNewGroup = (name, description, owner_id) => async (dispatch) => {
//     const res = await fetch('/api/groups/',
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name,
//                 description,
//                 owner_id
//             }),
//         })

//     if(res.ok){
//         const group = await res.json()
//         console.log(group);

//         dispatch(createGroup(group))
//     }
// }

const initialState = {};

export default function groupReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOADGROUPS:
            newState = { ...initialState }

            action.list.forEach((group) => {
                newState[group.id] = group
            })

            console.log(newState);

            return newState;

        case LOADGROUPDETAILS:
            newState = { ...initialState }

            console.log(action.group);

            newState.groupDetails = action.group

            return newState

        default:
            return state;
    }
}
