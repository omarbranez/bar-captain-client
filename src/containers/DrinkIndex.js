import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDrinks } from '.././actions/actionsDrinks'

const DrinkIndex = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDrinks())
    }, [dispatch])

    return(
        <div>
            {props.drinks.map(drink => 
            <Link to={`/drinks/${drink.id}`}>
                <span>{drink.name}</span>
                <br/>
            </Link>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    drinks: state.drinks.drinks,
})

export default connect(mapStateToProps, {getDrinks})(DrinkIndex)