import { DELETE_PRODUCT, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./action"

const initialState = {
    isLoading : true,
    products : []
}

export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload._id)
            };
        default:
            return state;
    }
};