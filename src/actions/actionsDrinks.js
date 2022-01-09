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

export const createDrink = (f, navigate) => {
    console.log(f)
    return dispatch => {
        fetch(api + `/drinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({
                name: f.drinkName,
                drink_type: f.drinkType,
                glass_type: f.glassType,
                ingredients: f.ingredientValues,
                instructions: f.drinkInstructions,
                photo_url: f.photoUrl
            })
        })
        // .then(res => console.log(res.json()))
        .then(res => res.json())
        .then(res => showNewDrink(res.variant, res.message, res.drink.data.attributes, navigate, dispatch))
        // .then(getDrinks())
            // navigate(`/drinks/${res.drink.data.attributes.id}`, {replace: true})}
        // .then(navigate(`/drinks/${res.drink.data.attributes.id}`, {replace: true}))
    }
}

// export const showNewDrink = (variant, message, dispatch, navigate) => {
export const showNewDrink = (variant, message, drink, navigate, dispatch) => {
    dispatch({
        type: "SNACKBAR_SHOW",
        payload: {variant, message}
    })
    getDrinks()
    navigate(`/drinks/${drink.id}`, {replace: true})
}

export const unsetSelectedDrink = () => ({
    type: "UNSET_SELECTED_DRINK"
})