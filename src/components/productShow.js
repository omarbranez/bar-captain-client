import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'
import { addProductToInventory, removeProductFromInventory } from '../actions/actionsUser'
import Button from '@mui/material/Button'

const ProductShow = ({
    setSelectedProduct, 
    unsetSelectedProduct,
    addProductToInventory,
    removeProductFromInventory, 
    user,
    // userProducts,
    // userDrinks,
    id, 
    name, 
    category, 
    subcategory, 
    description, 
    drinks}) => {

    const {productId} = useParams()

    useEffect(()=>{
        setSelectedProduct(productId)
        return unsetSelectedProduct
    }, [setSelectedProduct, productId, unsetSelectedProduct])

    const handleAddClick = (e) => {
        e.preventDefault()
        addProductToInventory(id)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        removeProductFromInventory(id)
    }

    const productDrinks = () => 
        <div>
            <p>{name} can be used to make the following cocktails:</p>
            {drinks.map(drink => <ul>{drink.name}</ul>)}
        </div>

    const userOwnsProduct = !!user.userProducts.find(up => up.id === id)
    // console.log(userOwnsProduct)

    const addOrDeleteProduct = () =>
        <div>
            {userOwnsProduct ? 
            <Button color="error" variant="contained" onClick={handleDeleteClick}>
                Remove from Inventory
            </Button>
            :
            <Button color="primary" variant="contained" onClick={handleAddClick}>
                Add to Inventory
            </Button>
            }
        </div>

    const loadedProduct = () => 
        <div>
            <div>
                <h2>{name}</h2>
                <p>{category}</p>
                <p>{subcategory}</p>
                <p>{description}</p>
                {productDrinks()}
            </div>
            <Link to={'/products'}>
                <span>Back To Product List</span>
            </Link>
            {addOrDeleteProduct()}
        </div>
    
    return id ? loadedProduct() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.products.selectedProduct,
    user: state.user
})

export default connect(mapStateToProps, { setSelectedProduct, unsetSelectedProduct, addProductToInventory, removeProductFromInventory })(ProductShow)