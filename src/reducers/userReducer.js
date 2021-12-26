const initialState = {
    id: null,
    username: '',
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "SET_USER":
            console.log(action.payload.data)
            return {...state, ...action.payload.data.attributes}
        case "LOGOUT":
            return {initialState}
        default:
            return {...state}
    }
}

export default userReducer