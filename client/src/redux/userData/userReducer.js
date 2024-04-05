import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP } from "./action";

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    isProfileLoading : false,
    token : "",
    userData : {}
}

export const userReducer = (state = initialState,{type,payload}) =>{
    switch(type){
        case USER_LOGIN_REQUEST : return{
            ...state,isLoading :true
        }
        case USER_LOGIN_SUCCESS : return {
            ...state,
            isLoading : false,
            isAuthenticated : true,
            token : payload,
        }
        case USER_SIGNUP : return{
            ...state,
            userData : payload
        }
        case USER_LOGOUT : return initialState;

        default : return state
    }
}