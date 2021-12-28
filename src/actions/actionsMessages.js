export const showSuccessSnackbar = (message) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_SUCCESS", payload: message })
    }
}

export const showErrorSnackbar = (message) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_ERROR", payload: message })
    }
}

export const showInfoSnackbar = (message) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_INFO", payload: message })
    }
}

export const showSnackbar = (variant, message) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_SHOW", payload: {variant, message}})
    }
}
export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" })
    }
}