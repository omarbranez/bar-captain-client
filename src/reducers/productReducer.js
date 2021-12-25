const nullProduct = {
    id: null,
    name: '',
    category: '',
    subcategory: '',
    description: '',
    photoUrl: '',
    products: [],
}

const initialState = {
    products: [],
    selectedProduct: nullProduct,
}

const productReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_PRODUCTS":
            return {...state, products: action.payload}
        case "SET_SELECTED_PRODUCT":
            return {...state, selectedProduct: action.payload}
        case "UNSET_SELECTED_PRODUCT":
            return {...state, selectedProduct: nullProduct}
        default: 
            return {...state}
    }
}

export default productReducer