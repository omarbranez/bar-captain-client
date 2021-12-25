import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getProducts } from '.././actions/actionsProducts'

const ProductIndex = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])

    return(
        <div>
            {props.products.map(product => <h1>{product.name}</h1>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
})

export default connect(mapStateToProps, {getProducts})(ProductIndex)