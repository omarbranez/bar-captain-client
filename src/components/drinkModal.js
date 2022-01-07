import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDrink, unsetSelectedDrink } from '../actions/actionsDrinks'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DrinkModal = ({drinkId}) => {
    
    const dispatch = useDispatch()

    const drink = useSelector(state => state.drinks.selectedDrink)

    useEffect(()=>{
        dispatch(setSelectedDrink(drinkId))
        return unsetSelectedDrink
    }, [dispatch])

    return (
        <CardContent>
            <Typography paragraph>
                Glass Type: {drink.glass_type}
            </Typography>
            <Typography> 
                Ingredients:
                {drink.ingredients.map(ing => <ul>{ing.quantity} {ing.product.name}</ul>)}
                {/* {drink.products.map(prod => <ul>{prod.name}</ul>)} */}
            </Typography>
            <Typography paragraph>
                {drink.instructions}
            </Typography>
        </CardContent>
    )
}

export default DrinkModal