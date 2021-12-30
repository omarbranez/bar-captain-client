const initialState = {
    snackBarOpen: false,
    snackBarType: '',
    snackBarMessage: '',
}

const messageReducer = (state=initialState,action) => {
    switch(action.type){
        case "SNACKBAR_SHOW":
            return {...state, snackBarOpen: true, snackBarType: action.payload.variant, snackBarMessage: action.payload.message}
        case "SNACKBAR_CLEAR":
            return {...state, snackBarOpen: false, snackBarType: '', snackBarMessage: '' }
        default:
            return {...state}
    }
}

export default messageReducer