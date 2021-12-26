import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getDrinks } from '.././actions/actionsDrinks'

const DrinkIndex = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDrinks())
    }, [dispatch])

    return(
        <div>
            {props.drinks.map(drink => <h1>{drink.name}</h1>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    drinks: state.drinks.drinks,
})

export default connect(mapStateToProps, {getDrinks})(DrinkIndex)