import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSelectedDrink, unsetSelectedDrink } from '../actions/actionsDrinks'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'

const DrinkModal = ({drinkId}) => {
    
    const dispatch = useDispatch()

    const drink = useSelector(state => state.drinks.selectedDrink)
    const userProducts = useSelector(state => state.user.userProducts)

    useEffect(()=>{
        dispatch(setSelectedDrink(drinkId))
        return unsetSelectedDrink
    }, [dispatch])

    const ownedProduct = (product) => {
        console.log(product)
        if (userProducts.some(prod => prod.id == product.id)){
            return true
        } else {
            return false
        }
    }

    return (
        <CardContent>
            <Typography paragraph>
                Glass Type: {drink.glass_type}
            </Typography>
            <Typography> 
                Ingredients:
                {drink.ingredients.map(ing => 
                <ul>{ownedProduct(ing.product) && <CheckIcon/>}{ing.quantity} <Link to={`/products/${ing.product.id}`}> {ing.product.name}</Link></ul>)}
            </Typography>
            <Typography paragraph>
                {drink.instructions}
            </Typography>
        </CardContent>
    )
}

export default DrinkModal