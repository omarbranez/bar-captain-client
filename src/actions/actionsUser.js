const api = process.env.REACT_APP_API

export const createUser = (form, navigate) => {
    return dispatch => fetch(api + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    })
    .then(res => handleUserResponse(res, dispatch))
    .then(navigate('/products', {replace: true}))
}

export const loginUser = (form, navigate) => {
    return dispatch => fetch(api + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(res => handleUserResponse(res, dispatch))
    .then(navigate('/products', {replace: true}))
}

export const autoLoginUser = () => {
    return dispatch => fetch(api + "/autologin", {
        headers: {
            'Authorization': localStorage.token
        }
    })
    .then(res => handleUserResponse(res, dispatch))
}

export const addProductToInventory = (productId) => {
    return dispatch => fetch(api + `/userproducts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
        body: JSON.stringify({product_id: productId})
    })
    .then(res => res.json())
    .then(user => dispatch({
        type: "UPDATE_USER_PRODUCTS",
        payload: user
    }))
    .then(user => dispatch({
        type: "UPDATE_USER_DRINKS",
        payload: user
    }))
}

export const removeProductFromInventory = (productId) => {
    return dispatch => fetch(api + `/userproducts`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
        body: JSON.stringify({product_id: productId})
    })
    .then(res => res.json())
    .then(user => dispatch({
        type: "UPDATE_USER_PRODUCTS",
        payload: user
    }))
    .then(user => dispatch({
        type: "UPDATE_USER_DRINKS",
        payload: user
    }))
}

export const logoutUser = (navigate) => {
    return dispatch => {
        localStorage.clear("token")
        dispatch({type: "LOGOUT"})
        navigate('/login', {replace: true})
    }
}

const handleUserResponse = (res, dispatch) => {
    if (res.ok) {
      res.json()
      .then(response => {
          console.log(response)
        localStorage.token = response.token
        dispatch({type: "SET_USER", payload: response.user})
      })
    } else {
      res.json()
      .then(res => alert(res.errors))
    }
}