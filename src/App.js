import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoLoginUser } from './actions/actionsUser'
import ProductIndex from './containers/ProductIndex'
import ProductShow from './components/productShow'
import DrinkIndex from './containers/DrinkIndex'
import DrinkShow from './components/drinkShow'
import UserLogin from './components/userLogin'
import UserRegister from './components/userRegister'


function App({autoLoginUser}) {

  useEffect(() => localStorage.token && autoLoginUser(), [autoLoginUser])

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/products' element={<ProductIndex/>}/>
        <Route path='/products/:productId' element={<ProductShow/>}/>
        <Route path='/drinks' element={<DrinkIndex/>}/>
        <Route path='/drinks/:drinkId' element={<DrinkShow/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps, {autoLoginUser})(App)
