const initialState = {
    id: null,
    username: '',
    userProducts: [],
    userDrinks: [],
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "SET_USER":
            console.log(action.payload.data)
            return {...state, ...action.payload.data.attributes}
        case "UPDATE_USER_PRODUCTS":
            return {...state, products: [...action.payload.data.attributes.products]}
        case "UPDATE_USER_DRINKS":
            return {...state, drinks: [...action.payload.data.attributes.drinks]}
        case "LOGOUT":
            return {initialState}
        default:
            return {...state}
    }
}

export default userReducer