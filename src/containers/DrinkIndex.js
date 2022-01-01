import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDrinks } from '.././actions/actionsDrinks'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const DrinkIndex = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDrinks())
    }, [dispatch])

    return(
        <div>
            {/* {props.drinks.map(drink => 
            <Link to={`/drinks/${drink.id}`}>
                <span>{drink.name}</span>
                <br/>
            </Link>)} */}
            <h1>List of Drinks</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {props.drinks.map((drink, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Link to={`/drinks/${drink.id}`}>
                        <Item>{drink.name}</Item>
                        <img src={drink.photo_url} height='200px'></img>
                        </Link>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => ({
    drinks: state.drinks.drinks,
})

export default connect(mapStateToProps, {getDrinks})(DrinkIndex)