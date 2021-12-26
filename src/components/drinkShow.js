import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setSelectedDrink, unsetSelectedDrink } from '../actions/actionsDrinks'

const DrinkShow = ({setSelectedDrink, unsetSelectedDrink, id, name, drinkType, glassType, instructions}) => {

    const {drinkId} = useParams()
    useEffect(()=>{
        setSelectedDrink(drinkId)
        return unsetSelectedDrink
    }, [setSelectedDrink, drinkId, unsetSelectedDrink])

    const loadedDrink = () => 
    <div>
        <div>
            <h2>{name}</h2>
            <p>{drinkType}</p>
            <p>{glassType}</p>
            <p>{instructions}</p>
        </div>
        <Link to={'/drinks'}>
            <p>Back To Drink List</p>
        </Link>
    </div>

return id ? loadedDrink() : <h2>Loading...</h2>
}

const mapStateToProps = (state) => ({
    ...state.drinks.selectedDrink
})

export default connect(mapStateToProps, { setSelectedDrink, unsetSelectedDrink })(DrinkShow)