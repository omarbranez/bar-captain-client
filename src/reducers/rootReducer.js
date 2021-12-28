import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import drinkReducer from './drinkReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    drinks: drinkReducer,
    message: messageReducer,
})

export default rootReducer