import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'

const ProductShow = ({setSelectedProduct, unsetSelectedProduct, id, name, category, subcategory, description, drinks}) => {

    const {productId} = useParams()

    useEffect(()=>{
        setSelectedProduct(productId)
        return unsetSelectedProduct
    }, [setSelectedProduct, productId, unsetSelectedProduct])
    console.log(drinks.map(drink => drink.name))

    const productDrinks = () => 
        <div>
            <p>{name} can be used to make the following cocktails:</p>
            {drinks.map(drink => <ul>{drink.name}</ul>)}
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
        </div>
    
    return id ? loadedProduct() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.products.selectedProduct
})

export default connect(mapStateToProps, { setSelectedProduct, unsetSelectedProduct })(ProductShow)