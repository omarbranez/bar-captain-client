import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'

const ProductShow = ({setSelectedProduct, unsetSelectedProduct, id, name, category, subcategory, description}) => {

    const {productId} = useParams()

    useEffect(()=>{
        setSelectedProduct(productId)
        return unsetSelectedProduct
    }, [setSelectedProduct, productId, unsetSelectedProduct])

    // console.log(props.selectedProduct)
    const loadedProduct = () => 
        <div>
            <div>
                <h2>{name}</h2>
                <p>{category}</p>
                <p>{subcategory}</p>
                <p>{description}</p>
            </div>
            <Link to={'/products'}>
                <p>Back To Product List</p>
            </Link>
        {/* // <div> */}
        </div>
    
    return id ? loadedProduct() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    // selectedProduct: 
    ...state.products.selectedProduct
})

export default connect(mapStateToProps, { setSelectedProduct, unsetSelectedProduct })(ProductShow)