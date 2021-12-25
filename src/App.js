import logo from './logo.svg'
import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductIndex from './containers/ProductIndex'
import ProductShow from './components/productShow'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/products' element={<ProductIndex/>}/>
        <Route path='/products/:productId' element={<ProductShow/>}/>
      </Routes>
    </div>
  );
}

export default App
