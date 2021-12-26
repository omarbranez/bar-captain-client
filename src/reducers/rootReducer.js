import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import drinkReducer from './drinkReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    drinks: drinkReducer,
})

export default rootReducer