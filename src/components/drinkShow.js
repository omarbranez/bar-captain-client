import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setSelectedDrink, unsetSelectedDrink } from '../actions/actionsDrinks'

const DrinkShow = ({setSelectedDrink, unsetSelectedDrink, id, name, drinkType, glassType, instructions, photoUrl, ingredients}) => {

    const {drinkId} = useParams()
    useEffect(()=>{
        setSelectedDrink(drinkId)
        return unsetSelectedDrink
    }, [setSelectedDrink, drinkId, unsetSelectedDrink])


    const drinkProducts = () => 
    <div>
        <p>{name} requires the following ingredients:</p>
        {ingredients.map(ing => <ul>{ing.product.name}</ul>)}
    </div>

    console.log(photoUrl)
    const loadedDrink = () => 
    <div>
        <div>
            <h2>{name}</h2>
            <img src={photoUrl}/>
            <p>{drinkType}</p>
            <p>{glassType}</p>
            {drinkProducts()}
        </div>
        <Link to={'/drinks'}>
            <span>Back To Drink List</span>
        </Link>
    </div>

return id ? loadedDrink() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.drinks.selectedDrink
})

export default connect(mapStateToProps, { setSelectedDrink, unsetSelectedDrink })(DrinkShow)