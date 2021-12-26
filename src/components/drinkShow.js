import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedDrink, unsetSelectedDrink } from '../actions/actionsDrinks'

const DrinkShow = (props) => {

    const {drinkId} = useParams()
    useEffect(()=>{
        props.setSelectedDrink(drinkId)
        return props.unsetSelectedDrink
    }, [setSelectedDrink, drinkId, unsetSelectedDrink])

    // console.log(props.selectedDrink)

    return (
        <div>
            <h2>{props.selectedDrink ? props.selectedDrink.name : "LOADING"}</h2>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedDrink: state.drinks.selectedDrink
})

export default connect(mapStateToProps, { setSelectedDrink, unsetSelectedDrink })(DrinkShow)