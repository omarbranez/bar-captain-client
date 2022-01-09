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

export const setSelectedDrink = (id) => {
    return dispatch => {
        fetch(api + `/drinks/${id}`)
        .then(res => res.json())
        .then(drink => dispatch({
            type: "SET_SELECTED_DRINK",
            payload: drink
        }))
    }
}

export const createDrink = (formData, navigate) => {
    console.log(formData)
    return dispatch => {
        fetch(api + `/drinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => showNewDrink(res.data, dispatch)
        .then(navigate(`/drinks/${res.drink.data.attributes.id}`, {replace: true}))
    )}
}

const showNewDrink = (variant, message, dispatch) => {
    dispatch({
        type: "SNACKBAR_SHOW",
        payload: {variant, message}
    })
}
export const unsetSelectedDrink = () => ({
    type: "UNSET_SELECTED_DRINK"
})