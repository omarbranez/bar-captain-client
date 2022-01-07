import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSelectedProduct, unsetSelectedProduct } from '../actions/actionsProducts'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ProductModal = ({productId}) => {
    
    const dispatch = useDispatch()

    const product = useSelector(state => state.products.selectedProduct)

    useEffect(()=>{
        dispatch(setSelectedProduct(productId))
        return unsetSelectedProduct
    }, [dispatch])

    return (
        <CardContent>
            <Typography paragraph>
                Category: {product.category}
            </Typography>
            <Typography> 
                Subcategory: {product.subcategory}
            </Typography>
            <Typography paragraph>
                Description: {product.description}
            </Typography>
        </CardContent>
    )
}

export default ProductModal