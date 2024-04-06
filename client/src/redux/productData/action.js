import { products } from "../../mock"

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST"
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS"

export const getProduct = () => async(dispatch) =>{
    try {
        dispatch({type : GET_PRODUCT_REQUEST})
        const response = await fetch("https://arba-backend-j9r7.onrender.com/products")
        const data = await response.json();
        dispatch({type : GET_PRODUCT_SUCCESS,payload : data})
    } catch (error) {
        console.log(error);
        dispatch({type : GET_PRODUCT_SUCCESS, payload : products})
    }
}