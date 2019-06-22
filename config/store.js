import { createStore, applyMiddleware, combineReducers } from "redux";
import LoginReducer from '../screens/login/LoginReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import thunk from "redux-thunk";
import AddRouteReducer from '../screens/add-route/AddRouteReducer';

const loginConfig = {
  key: 'login',
  storage,
}
const persistedLogin = persistReducer(loginConfig, LoginReducer)

const addRouteConfig = {
  key: 'addRoute',
  storage,
}
const persistedAddRoute = persistReducer(addRouteConfig, AddRouteReducer)

let store = createStore(combineReducers({
  login: persistedLogin,
  addRoute: persistedAddRoute
}), applyMiddleware(thunk));

export const persistor = persistStore(store)

export default store