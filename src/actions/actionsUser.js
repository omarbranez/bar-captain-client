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