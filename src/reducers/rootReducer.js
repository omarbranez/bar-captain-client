import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    // drinks: drinkReducer,
})

export default rootReducer