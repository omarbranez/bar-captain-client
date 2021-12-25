import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'

const ProductShow = (props) => {

    const {productId} = useParams()
    useEffect(()=>{
        props.setSelectedProduct(productId)
        return props.unsetSelectedProduct
    }, [setSelectedProduct, productId, unsetSelectedProduct])

    console.log(props.selectedProduct)

    return (
        <div>
            <h2>{props.selectedProduct ? props.selectedProduct.name : "LOADING"}</h2>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedProduct: state.products.selectedProduct
})

export default connect(mapStateToProps, { setSelectedProduct, unsetSelectedProduct })(ProductShow)