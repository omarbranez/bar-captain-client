const DRINKS_URL = "https://barcaptain.herokuapp.com/drinks"

export const getDrinks = () => {
    return dispatch => {
        fetch(DRINKS_URL)
        .then(res => res.json())
        .then(drinks => dispatch({
            type: "ADD_DRINKS",
            payload: drinks
        }))
    }
}

export const setDrink = (id) => {
    return dispatch => {
        fetch(DRINKS_URL + `/${id}`)
        .then(res => res.json())
        .then(drink => dispatch({
            type: "SET_SELECTED_DRINK",
            payload: drink
        }))
    }
}

export const unsetDrink = () => ({
    type: "UNSET_SELECTED_DRINK"
})