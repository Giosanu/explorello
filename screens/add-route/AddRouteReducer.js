import {
  FETCH_GOOGLE_MAP,
  FETCH_GOOGLE_MAP_SUCCESS,
  FETCH_GOOGLE_MAP_FAIL
} from "./AddRouteActions";

const INITIAL_STATE = {
  loading: false,
  error: {},
  isAuthenticated: false,
  currentUser: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GOOGLE_MAP:
      return { ...state, loading: true, error: {} };
    case FETCH_GOOGLE_MAP_SUCCESS:
        console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: {},
        details: action.payload,
        currentUser: action.payload
      };
    case FETCH_GOOGLE_MAP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
