const api = process.env.REACT_APP_API

export const createUser = (form, navigate) => {
    return dispatch => fetch(api + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    })
    .then(res => handleUserResponse(res, dispatch, navigate))
}

export const loginUser = (form, navigate) => {
    return dispatch => fetch(api + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(res => handleUserResponse(res, dispatch, navigate))
}

export const autoLoginUser = () => {
    return dispatch => fetch(api + "/autologin", {
        headers: {
            'Authorization': localStorage.token
        }
    })
    .then(res => handleUserResponse(res, dispatch))
}

export const getUser = (id) => {
    return dispatch => fetch(api + `/users/${id}`)
    .then(res => res.json())
    .then(user => dispatch({
        type: "GET_USER",
        payload: user
    }))
}

export const showSnackbar = (variant, message) => {
    console.log(variant)
    return dispatch => {
        dispatch({ type: "SNACKBAR_SHOW", payload: {variant, message}})
    }
}

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" })
    }
}

export const unsetUser = () => ({type: "UNSET_USER_SHOW"})

export const updateInventory = (data, dispatch) => {
    // console.log(navigate)
        dispatch({
            type: "UPDATE_USER_PRODUCTS_AND_DRINKS",
            payload: data
        })
        dispatch(showSnackbar(data.variant, data.message))
        console.log(data.user.data.id)
        // navigate(`/users/${data.user.data.id}`, {replace: true})
    }


    // dispatch({
    //     type: "UPDATE_USER_PRODUCTS_AND_DRINKS",
    //     payload: data
    // })
    // dispatch(showSnackbar(data.variant, data.message))
    // console.log(data.user.data.id)
    // // navigate(`/users/${data.user.data.id}`, {replace: true})
// }

export const addProductToInventory = (productId, navigate, userId) => {
    console.log(userId)
    return dispatch => fetch(api + "/addproduct", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
        body: JSON.stringify({product_id: productId})
    })
    .then(res => res.json())
    .then(res => updateInventory(res, dispatch))
    .then(navigate(`/users/${userId}`, {replace: true}))
}

export const removeProductFromInventory = (productId) => {
    return dispatch => fetch(api + "/deleteproduct", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
        body: JSON.stringify({product_id: productId})
    })
    .then(res => res.json())
    .then(res => updateInventory(res, dispatch))
}

export const logoutUser = (navigate) => {
    return dispatch => {
        localStorage.clear("token")
        dispatch({type: "LOGOUT"})
        navigate('/login', {replace: true})
    }
}

const handleUserResponse = (res, dispatch, navigate) => {
    if (res.ok) {
      res.json()
      .then(response => {
        localStorage.token = response.token
        dispatch({type: "SET_USER", payload: response.user})
        navigate(`/users/${response.user.data.attributes.id}`)
      })
    } else {
      res.json()
      .then(res => alert(res.errors))
    }
}