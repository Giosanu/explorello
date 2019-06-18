import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL
} from './LoginActions'

const INITIAL_STATE = {
    loading: false,
    error: {},
    isAuthenticated: false,
    currentUser: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, loading: true, error: {}}
        case SIGN_IN_SUCCESS:
            return {...state, loading: false, error: {}, isAuthenticated: true, currentUser: action.payload}
        case SIGN_IN_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}