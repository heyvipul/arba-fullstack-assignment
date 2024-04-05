import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./action";

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    isProfileLoading : false,
    token : "",
    userData : {}
}

export const userReducer = (state = initialState,{type,payload}) =>{
    console.log("user payload",payload);
    switch(type){
        case USER_LOGIN_REQUEST : return{
            ...state,isLoading :true
        }
        case USER_LOGIN_SUCCESS : return {
            ...state,
            isLoading : false,
            isAuthenticated : true,
            payload : payload 
        }
        case USER_LOGOUT : return initialState;
        
        default : return state
    }
}