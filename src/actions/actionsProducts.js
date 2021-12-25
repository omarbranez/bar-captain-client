const PRODUCTS_URL = "https://barcaptain.herokuapp.com/products"
const api = process.env.REACT_APP_API

export const getProducts = () => {
    return dispatch => fetch(api + '/products')
    .then(res => res.json())
    .then(products => dispatch({
        type: "ADD_PRODUCTS",
        payload: products
    }))
}


export const setSelectedProduct = (id) => {
    // fetch(PRODUCTS_URL + `/${id}`)
    return dispatch => fetch(api + `/products/${id}`)
    .then(res => res.json())
    .then(product => dispatch({
        type: "SET_SELECTED_PRODUCT",
        payload: product
    }))
}


export const unsetSelectedProduct = () => ({
    type: "UNSET_SELECTED_PRODUCT"
})