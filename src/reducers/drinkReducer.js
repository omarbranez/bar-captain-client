const nullDrink = {
    id: null,
    name: '',
    drinkType: '',
    glassType: '',
    instructions: '',
    author: '',
    products: [],
    quantity: [],
}

const initialState = {
    drinks: [],
    selectedDrink: nullDrink,
}

const drinkReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_DRINKS":
            return {...state, drinks: action.payload}
        case "SET_SELECTED_DRINK":
            return {...state, selectedDrink: action.payload}
        case "UNSET_SELECTED_DRINK":
            return {...state, selectedDrink: nullDrink}
        default: 
            return {...state}
    }
}

export default drinkReducer