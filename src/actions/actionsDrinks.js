// const DRINKS_URL = "https://barcaptain.herokuapp.com/drinks"
const api = process.env.REACT_APP_API

export const getDrinks = () => {
    return dispatch => {
        fetch(api + '/drinks')
        .then(res => res.json())
        .then(drinks => dispatch({
            type: "ADD_DRINKS",
            payload: drinks
        }))
    }
}

export const setDrink = (id) => {
    return dispatch => {
        fetch(api + `/drinks/${id}`)
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