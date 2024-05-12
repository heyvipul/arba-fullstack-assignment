import { products } from "../../mock"

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST"
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS"
export const DELETE_PRODUCT = "DELETE_PRODUCT"

export const getProduct = () => async(dispatch) =>{
    try {

        dispatch({type : GET_PRODUCT_REQUEST})
        const response = await fetch("http://localhost:8000/products")
        const data = await response.json();
        dispatch({type : GET_PRODUCT_SUCCESS,payload : data})
  
    } catch (error) {
        console.log(error);
        dispatch({type : GET_PRODUCT_SUCCESS, payload : products})
    }
}

export const handleDelete = (id) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8000/products/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const data = await response.json(); // Await here
            dispatch({ type: DELETE_PRODUCT, payload: data }); // Use the resolved data
            // alert('Product deleted successfully');
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Error deleting product');
    }
};