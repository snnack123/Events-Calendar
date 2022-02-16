const initialState = {
    loggedIn: false,
    thisUser: {}
}

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'users/loggedIn':
            return { ...state, loggedIn: action.payload }
        case 'users/addUser':
            return { ...state, thisUser: action.payload }
        case 'users/setActivated':
            return { ...state, thisUser: { ...state.thisUser, activated: action.payload } }
        default:
            return state
    }
}