const nullDrink = {
    id: null,
    name: '',
    drinkType: '',
    glassType: '',
    instructions: '',
    author: '',
    products: [],
    quantity: [],
    ingredients: [],
}

const initialState = {
    drinks: [],
    selectedDrink: nullDrink,
}

const drinkReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_DRINKS":
            const drinkList = action.payload.data.map(drink => drink.attributes)
            return {...state, drinks: drinkList}
        case "SET_SELECTED_DRINK":
            return {...state, selectedDrink: action.payload.data.attributes}
        case "UNSET_SELECTED_DRINK":
            return {...state, selectedDrink: nullDrink}
        default: 
            return {...state}
    }
}

export default drinkReducer