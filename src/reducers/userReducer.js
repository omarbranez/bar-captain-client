const initialState = {
    id: null,
    username: '',
    userProducts: [],
    userDrinks: [],
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "SET_USER":
            // console.log(action.payload.data)
            return {...state, id: action.payload.data.attributes.id, username: action.payload.data.attributes.username, userProducts: action.payload.data.attributes.products, userDrinks: action.payload.data.attributes.drinks}
                // ...action.payload.data.attributes}
        case "UPDATE_USER_PRODUCTS":
            // console.log(action.payload.user.data.attributes)
            return {...state, userProducts: [...action.payload.user.data.attributes.products]}
        case "UPDATE_USER_DRINKS":
            return {...state, userDrinks: [...action.payload.user.data.attributes.drinks]}
        case "LOGOUT":
            return {initialState}
        default:
            return {...state}
    }
}

export default userReducer