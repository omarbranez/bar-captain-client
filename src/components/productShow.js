import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'

const ProductShow = (props) => {

    const {productId} = useParams()
    
    useEffect(()=>{
        setSelectedProduct(productId)
        return unsetSelectedProduct
    }, [setSelectedProduct, productId, unsetSelectedProduct])

    return (
        <div>
            <h2>{props.selectedReport.name}</h2>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedReport: state.selectedReport
})

export default connect(mapStateToProps, { setSelectedProduct, unsetSelectedProduct })(ProductShow)