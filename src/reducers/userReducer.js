const initialState = {
    id: null,
    username: '',
    userProducts: [],
    userDrinks: [],
    selectedUser: {
        id: null,
        username: '',
        userProducts: [],
        userDrinks: [],
    }
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {...state, id: action.payload.data.attributes.id, username: action.payload.data.attributes.username, userProducts: action.payload.data.attributes.products, userDrinks: action.payload.data.attributes.drinks}
        case "UPDATE_USER_PRODUCTS_AND_DRINKS":
            console.log(action.payload)
            return {...state, userProducts: [...action.payload.user.data.attributes.products], userDrinks: [...action.payload.user.data.attributes.drinks]}
        case "GET_USER":
            return {...state, selectedUser: {id: action.payload.data.attributes.id, username: action.payload.data.attributes.username, userProducts: action.payload.data.attributes.products, userDrinks: action.payload.data.attributes.drinks}}
        case "UNSET_USER_SHOW":
            return {...state, selectedUser: null}
        case "LOGOUT":
            return {initialState}
        default:
            return {...state}
    }
}

export default userReducer