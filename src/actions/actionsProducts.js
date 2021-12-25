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

