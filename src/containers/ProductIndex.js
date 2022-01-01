import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '.././actions/actionsProducts'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

const ProductIndex = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])

    return(
        <div>
            {/* {props.products.map(product => 
            <Link to={`/products/${product.id}`}>
                <span>{product.name}</span>
                <br/>
            </Link>)} */}
             <h1>List of Products</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {props.products.map((product, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Link to={`/products/${product.id}`}>
                        <Item>{product.name}</Item>
                        </Link>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
})

export default connect(mapStateToProps, {getProducts})(ProductIndex)