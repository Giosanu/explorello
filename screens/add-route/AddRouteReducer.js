import {
  FETCH_GOOGLE_MAP,
  FETCH_GOOGLE_MAP_SUCCESS,
  FETCH_GOOGLE_MAP_FAIL,
  STORE_ROUTE,
  START_COMPUTE_CENTER,
  START_COMPUTE_CENTER_SUCCESS
} from "./AddRouteActions";

const INITIAL_STATE = {
  loading: false,
  error: {},
  routeCenter: {},
  isAuthenticated: false,
  route: [],
  currentUser: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GOOGLE_MAP || START_COMPUTE_CENTER:
      alert('yes')
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

    case START_COMPUTE_CENTER_SUCCESS:
      return { ...state, loading: false, routeCenter: action.payload}

    case STORE_ROUTE:
      return { ...state, route: action.payload}

    default:
      return state;
  }
};
