const initialState = {
    // successSnackbarOpen: false,
    // successSnackbarMessage: '',
    // errorSnackbarOpen: false,
    // errorSnackbarMessage: '',
    // infoSnackbarOpen: false,
    // infoSnackbarMessage: '',
    snackBarType: '',
    snackBarMessage: '',
}

const messageReducer = (state=initialState,action) => {
    switch(action.type){
        case "SNACKBAR_SUCCESS":
            return {...state, successSnackbarOpen: true, successSnackbarMessage: action.payload.message}
        case "SNACKBAR_ERROR":
            return {...state, errorSnackbarOpen: true, errorSnackbarMessage: action.payload.message}
        case "SNACKBAR_INFO":
            return {...state, infoSnackbarOpen: true, infoSnackbarMessage: action.payload.message}
        case "SNACKBAR_SHOW":
            return {...state, snackBarType: action.payload.variant, snackBarMessage: action.payload.message}
        case "SNACKBAR_CLEAR":
            return {...state, initialState }
        default:
            return {...state}
    }
}

export default messageReducer