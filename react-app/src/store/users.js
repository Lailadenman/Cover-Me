const GET_USER = "users/GET_USER"

const getUser = (user) => ({
    type: GET_USER,
    user
})


export const getUserInfo = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)

    // console.log("get user thunk hit");
    // console.log(res.url);

    if (res.ok) {
        const user = await res.json()

        dispatch(getUser(user))

        // console.log("get user thunk successful", user.firstName);
    }
}

const initialState = {};

export default function userReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = initialState

            // console.log("this is the store ", action.user);

            newState.userProf = action.user

            return newState

        default:
            return state;
    }
}
