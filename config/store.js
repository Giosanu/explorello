import { combineReducers } from 'redux'
import LoginReducer from '../screens/login/LoginReducer'

export default combineReducers({
  login: LoginReducer,
});