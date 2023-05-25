const LOADGROUPS = "group/LOADGROUPS"

const loadGroups = (list) => ({
    type: LOADGROUPS,
    list
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

export const getGroupDetails = (name, description, owner_id) => async (dispatch) => {
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


}

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

        default:
            return state;
    }
}
