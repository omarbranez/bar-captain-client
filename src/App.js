import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoLoginUser, logoutUser } from './actions/actionsUser'
import ProductIndex from './containers/ProductIndex'
import ProductShow from './components/productShow'
import DrinkIndex from './containers/DrinkIndex'
import DrinkShow from './components/drinkShow'
import UserLogin from './components/userLogin'
import UserRegister from './components/userRegister'
import UserProfile from './components/userProfile'
import UserProfileRedirect from './components/userProfileRedirect'
import UserLogout from './components/userLogout'
import Button from '@mui/material/Button'
import Navbar from './components/navbar'

function App({autoLoginUser, logoutUser}) {

  // const navigate = useNavigate()

  useEffect(() => localStorage.token && autoLoginUser(), [autoLoginUser])
  
  // const handleLogout = (e) => {
  //   e.preventDefault()
  //   logoutUser(navigate)
  // }
  return (
    <div className="App">
      {/* {localStorage.token && <Button variant="contained" color="primary" onClick={handleLogout}>Log Out</Button>} */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/login/success' element={<UserProfileRedirect/>}/>
        <Route path='/logout' element={<UserLogout/>}/>
        <Route path='/users/:userId' element={<UserProfile/>}/>
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

export default connect(mapStateToProps, {autoLoginUser, logoutUser})(App)
