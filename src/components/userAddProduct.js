import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addProductToInventory } from '../actions/actionsUser'
import { getProducts } from '../actions/actionsProducts'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'


const UserAddProduct = ({products, addProductToInventory, getProducts}) => {

    const navigate = useNavigate()

    const {userId} = useParams()
    const dispatch = useDispatch()

    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [name, setName] = useState('')
    const [productId, setProductId] = useState(null)

    const [activeStep, setActiveStep] = useState(0)
    const steps = ['Category','Subcategory','Name' ]
    const stateArray = [category, subcategory, name]
    
    useEffect(()=>{
        dispatch(getProducts)
    }, [dispatch])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSelect = (e) => {
        setName(e.target.value.name)
        setProductId(e.target.value.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(navigate)
        addProductToInventory(productId, navigate, userId)
        // navigate(`/users/${userId}`)
    }

    const prodCategories = [...new Set(products.map(prod => prod.category))].sort() // make the backend do this // but with three fetches?
    const prodSubcategories = [...new Set(products.filter(product => product.category === category).map(prod => prod.subcategory))].sort()
    // const prodNames = [...new Set(products.filter(product => product.subcategory === subcategory).map(prod => prod.name))].sort()
    const prodNames = [...new Set(products.filter(product => product.subcategory === subcategory))].sort((a,b) => (a.name > b.name) ? 1 : -1)

    return(
        <div>
            <h2>Add Product to Inventory</h2>
            <div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {}
                        const labelProps = {}
                        return ( 
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {activeStep === 0 && (
                    <div>
                        <FormControl margin="dense" sx={{ m: 1, minWidth: 200}}>
                            <InputLabel>Product Category</InputLabel>
                            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                {prodCategories.map(cat => <MenuItem value={cat}>{cat}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                )}
                {activeStep === 1 && (
                    <div>
                        <FormControl margin="dense" sx={{ m: 1, minWidth: 200}}>
                            <InputLabel>Product Subcategory</InputLabel>
                            <Select value={subcategory} onChange={(e)=>setSubcategory(e.target.value)}>
                                {prodSubcategories.map(subcat => <MenuItem value={subcat}>{subcat}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                )}
                {activeStep === 2 && (
                    <div>
                        <FormControl margin="dense" sx={{ m:1, minWidth: 200}}>
                            <InputLabel>Product Name</InputLabel>
                            <Select value={name} renderValue={(p)=>p} onChange={(e) => handleSelect(e)}>
                                {prodNames.map(prod => <MenuItem value={prod}>{prod.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                )}
                {activeStep === 3 && (
                    <div>
                        <Button 
                            disabled={!name}
                            onClick={handleSubmit}
                            sx={{ mr: 1}}
                            variant="contained"
                            >{name && `Add ${name} to Inventory`}
                        </Button>
                    </div>
                )}
            </div>
            <Button
                color="error"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >Back
            </Button>
            <Button
                color="success"
                variant="contained" 
                onClick={handleNext}
                disabled={!stateArray[activeStep] || !category}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
    user: state.user
})

export default connect(mapStateToProps, { addProductToInventory, getProducts })(UserAddProduct)