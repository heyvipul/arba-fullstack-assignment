import {legacy_createStore,combineReducers,applyMiddleware} from "redux"
import { thunk } from "redux-thunk";
import { userReducer } from "./userData/userReducer";
import {productReducer} from "./productData/productReducer"

const rootReducer = combineReducers({userReducer,productReducer});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))