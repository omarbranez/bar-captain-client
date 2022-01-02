import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '.././actions/actionsProducts'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

const ProductIndex = ({products}) => {

    const dispatch = useDispatch()
    const [categoryFilter, setCategoryFilter] = useState('')
    const [subcategoryFilter, setSubcategoryFilter] = useState('')
    const [alignment, setAlignment] = useState('left')

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment)
          }
    }

    const handleReset = (e) => {
        setCategoryFilter('')
        setSubcategoryFilter('')
    }

    const handleSelectAlcoholic = (e) => {
        setCategoryFilter('Liquor')
        setSubcategoryFilter('')
    }

    const handleSelectNonAlcoholic = (e) => {
        setCategoryFilter('Mixer')
        setSubcategoryFilter('')
    }  

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])

    // const productCategories = ['Alcohol'] yes/no
    const prodCategories = [...new Set(products.map(prod => prod.category))].sort()
    const prodSubcategories = [...new Set(products.filter(product => product.category === categoryFilter).map(prod => prod.subcategory))].sort()
    const catFilteredProducts = (prods) => {
        if (categoryFilter) {
            return prods.filter(cat => cat.category == categoryFilter)
        } else {
            return prods
        }
    }

    const subcatFilteredProducts = (prods) => {
        if (subcategoryFilter) {
            return catFilteredProducts(prods).filter(prod => prod.subcategory == subcategoryFilter)
        } else {
            return catFilteredProducts(prods)
        }
    }

    return(
        <div>
            <h1>List of Products</h1>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >   
            <p style={{display:'block'}}>Filter By Product Type &nbsp;</p>
                <ToggleButton value="left" aria-label="left aligned" onClick={(e) => handleReset(e)}>
                    No Filter
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered" onClick={(e) => handleSelectAlcoholic(e)}>
                    Alcoholic
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned" onClick={(e) => handleSelectNonAlcoholic(e)}>
                    Non-Alcoholic
                </ToggleButton>
            </ToggleButtonGroup>
            <br/>
            {categoryFilter !== '' &&
                <div>
                <p style={{display:'inline-block'}}>Filter by Subcategory &nbsp;</p> 
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <Select disabled={categoryFilter == ''} label="Filter by Subcategory" value={subcategoryFilter} onChange={(e)=> setSubcategoryFilter(e.target.value)}>
                        {prodSubcategories.map(subcat => <MenuItem value={subcat}>{subcat}</MenuItem>)}
                    </Select>
                </FormControl>
                </div>
            }
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {subcatFilteredProducts(products).map((product, index) => (
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