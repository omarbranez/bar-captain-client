import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDrinks } from '.././actions/actionsDrinks'
import DrinkModal from '../components/drinkModal'
import { experimentalStyled as styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})

(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}))

const DrinkIndex = ({drinks, userDrinks}) => {

    const dispatch = useDispatch()
    // const [expanded, setExpanded] = useState(false)
    const [expandedId, setExpandedId] = useState(-1)

    useEffect(()=>{
        dispatch(getDrinks())
    }, [dispatch])

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i)
    }

    const ownedDrink = (drink) => {
        if (userDrinks.some(d => d.id == drink.id)){
            return true
        } else {
            return false
        }
    }
    return(
        <div>
            <h1>List of Drinks</h1>
            <Grid container spacing={3}>
                {drinks.map((drink, i) => 
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="drink">
                                    {drink.name[0]}
                                </Avatar>
                                }
                                title={drink.name}
                                subheader={drink.drink_type}
                                />
                            <CardMedia
                                component="img"
                                height="194"
                                src={drink.photo_url}
                                />
                            <CardActions disableSpacing>
                                {ownedDrink(drink) && <Button variant="outlined" color="primary" disabled>In Collection</Button>}
                                <ExpandMore
                                    expand={expandedId === i}
                                    onClick={()=>handleExpandClick(i)}
                                    aria-expanded={expandedId === i}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                <DrinkModal drinkId={drink.id}/>
                            </Collapse>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    drinks: state.drinks.drinks,
    userDrinks: state.user.userDrinks
})

export default connect(mapStateToProps, {getDrinks})(DrinkIndex)