import { combineReducers } from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    // products: productReducer,
    // drinks: drinkReducer,
})

export default rootReducer