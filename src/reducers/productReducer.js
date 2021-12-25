const nullProduct = {
    id: null,
    name: '',
    category: '',
    subcategory: '',
    description: '',
    // photoUrl: '',
    drinks: [],
}

const initialState = {
    products: [],
    selectedProduct: nullProduct,
}

const productReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_PRODUCTS":
            // console.log(action.payload.data[0].attributes)
            const productList = action.payload.data.map(prod => prod.attributes)
            return {...state, products: productList}
        case "SET_SELECTED_PRODUCT":
            // console.log(action.payload.data.attributes)
            return {...state, selectedProduct: action.payload.data.attributes}
        case "UNSET_SELECTED_PRODUCT":
            return {...state, selectedProduct: nullProduct}
        default: 
            return {...state}
    }
}

export default productReducer