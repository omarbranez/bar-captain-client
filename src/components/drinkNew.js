import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getProducts } from '../actions/actionsProducts'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'

const DrinkNew = ({products, getProducts}) => {

    const dispatch = useDispatch()
    const [drinkName, setDrinkName] = useState('')
    const [drinkType, setDrinkType] = useState('')
    const [glassType, setGlassType] = useState('')
    const [drinkInstructions, setDrinkInstructions] = useState('')
    const [ingredient, setIngredient] = useState({product_id: null, quantity: ''})
    const [ingredientValue, setIngredientValue] = useState(products[0])
    const [ingredientInputValue, setIngredientInputValue] = useState('')
    const [ingredientValues, setIngredientValues] = useState([{product_id: null}])
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    // console.log(ingredientValues)
    useEffect(()=>{
        dispatch(getProducts)
    }, [dispatch])

    const addIngredientValue = () => {
        setIngredientValues([...ingredientValues, ''])
    }
    const handleIngredientValueChange = (e, index) => {
        console.log(e.target.value)
        const updatedValues = ingredientValues.map((val, i) => {
            if (i == index) {
                return e.target.value
            } else {
                return val
            }
        })
        setIngredientValues(updatedValues)
    }

    const deleteIngredientValue = (jump) => {
        console.log("clicked!")
        setIngredientValues(ingredientValues.filter((j) => j !== jump))
    }


    const drinkTypes = ['Beer', 'Cocktail', 'Coffee/Tea', 'Homemade Liqueur', 'Milk / Float / Shake', 'Ordinary Drink', 'Other/Unknown', 'Punch / Party Drink', 'Shot', 'Soft Drink / Soda']
    const glassTypes = ['Balloon Glass', 'Beer Glass', 'Beer Mug', 'Brandy Snifter', 'Champagne Flute', 'Cocktail Glass', 'Coffee Mug', 'Collins Glass', 'Copper Mug', 'Cordial Glass', 'Coupe Glass', 'Highball Glass', 'Hurricane Glass', 'Irish Coffee Cup', 'Margarita Glass', 'Margarita/Coupette Glass', 'Martini Glass', 'Mason Jar', 'Nick and Nora Glass', 'Old-Fashioned Glass', 'Pilsner Glass', 'Pint Glass', 'Pitcher', 'Pousse Cafe Glass', 'Punch Bowl', 'Rocks Glass', 'Shot Glass', 'Whiskey Glass', 'Whiskey Sour Glass', 'Wine Glass' ]
    
    // console.log(ingredientValues.length)
    // console.log(products)
    return(
        <div>
            <h1>Add a Drink Recipe</h1>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div>
                    <FormControl margin='dense' sx={{m:1, minWidth: 200}}>
                        <TextField helperText="What's your drink called?" id="outlined-required" required label="Drink Name" value={drinkName} onChange={(e) => setDrinkName(e.target.value)}/>
                    </FormControl>
                </div>
                <div>
                    <FormControl margin='dense' sx={{m:1, minWidth: 200}}>
                        <InputLabel>Drink Type *</InputLabel>
                        <Select id="outlined-required" required label="Drink Type *" value={drinkType} onChange={(e) => setDrinkType(e.target.value)}>
                            {drinkTypes.map(dType => <MenuItem value={dType}>{dType}</MenuItem>)}    
                        </Select>
                        <FormHelperText>What type of drink is it?</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <FormControl margin='dense' sx={{m:1, minWidth: 200}}>
                        <InputLabel>Glass Type *</InputLabel>
                        <Select id="outlined-required" required label="Glass Type *" value={glassType} onChange={(e)=> setGlassType(e.target.value)}>
                            {glassTypes.map(gType => <MenuItem value={gType}>{gType}</MenuItem>)}
                        </Select>
                        <FormHelperText>What type of glass does it go in?</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    {ingredientValues.map((jump, index) => (
                    <Autocomplete
                        disableCloseOnSelect
                        autoSelect
                        value={jump || ""}
                        onChange={(e)=>handleIngredientValueChange(e, index)}
                        fullWidth
                        // renderValue={(p)=>p}
                        disablePortal
                        options={products.map(prod => prod.name)}
                        inputValue={ingredientInputValue[jump]}
                        onInputChange={(e, newInputValue) => setIngredientInputValue(newInputValue)}
                        selectOnFocus={true}
                        // getOptionLabel={prod =>{return (`${prod.name}: ${prod.id}`)}}
                        getOptionLabel={(option) => `${option.name}`}
                        renderOption={(props, option) => {return <li {...props}>{`${option.name}`}</li>}}
                        renderInput={(params) => <TextField {...params} label={`Ingredient ${index + 1}`}/>}
                        clearOnEscape
                        // onClose={(e)=>deleteIngredientValue(jump)}
                    />
                    // {/* {products.map(prod => <MenuItem value={prod}>{prod.name}</MenuItem>)} */}
                    // {/* </Autocomplete> */}
                    ))}
                    <Button disabled={ingredientValues.length >= 8} onClick={addIngredientValue}>{ingredientValues >= 8 ? "Ingredient Limit Reached" : "Add Ingredient"}</Button>
                </div>
                <div>
                    <FormControl margin='dense' sx={{m:1, minWidth: 200}}>
                        <TextField helperText="How do you make your drink?" id="outlined-required" required multiline rows={4} label="Drink Instructions" value={drinkInstructions} onChange={(e)=>setDrinkInstructions(e.target.value)}/>
                    </FormControl>
                </div>
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
    user: state.user
})

export default connect(mapStateToProps, {getProducts})(DrinkNew)