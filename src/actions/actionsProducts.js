const PRODUCTS_URL = "https://barcaptain.herokuapp.com/products"

export const getProducts = () => {
    return dispatch => {
        fetch(PRODUCTS_URL)
        .then(res => res.json())
        .then(products => dispatch({
            type: "ADD_PRODUCTS",
            payload: products
        }))
    }
}

export const setSelectedProduct = (id) => {
    return dispatch => {
        fetch(PRODUCTS_URL + `/${id}`)
        .then(res => res.json())
        .then(product => dispatch({
            type: "SET_SELECTED_PRODUCT",
            payload: product
        }))
    }
}

export const unsetSelectedProduct = () => ({
    type: "UNSET_SELECTED_PRODUCT"
})