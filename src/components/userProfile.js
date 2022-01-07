import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser, unsetUser } from '../actions/actionsUser'
import { getDrinks } from '.././actions/actionsDrinks'
import DrinkModal from './drinkModal'
import ProductModal from './productModal'
import { experimentalStyled as styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

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

const UserProfile = ({getUser, unsetUser, user, selectedUser}) => {

    const {userId} = useParams()
    const [expandedId, setExpandedId] = useState(-1)
    const [expandedDrinkId, setExpandedDrinkId] = useState(-1)
    
    useEffect(()=>{
        getUser(userId)
        return unsetUser
    }, [getUser, userId, user.userProducts, unsetUser])

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i)
    }

    const handleExpandDrinkClick = (i) => {
        setExpandedDrinkId(expandedDrinkId === i ? -1 : i)
    }
    
    return(
        <div>
            {selectedUser &&
            <div>
                <h2>{selectedUser.username}'s Profile</h2>
                <span>Liquor Cabinet:</span>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {selectedUser.userProducts.map((product, i) => (
                    <Grid item xs={2} sm={4} md={4} key={i}>
                        <Item key={product.id}>
                            {product.name}
                            <ExpandMore
                                expand={expandedId === i}
                                onClick={()=>handleExpandClick(i)}
                                aria-expanded={expandedId === i}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                <ProductModal productId={product.id}/>
                            </Collapse>
                        </Item>
                    </Grid>
                    ))}
                </Grid>
                <br/>
                <span>Drink Collection:</span>
                <Grid container spacing={3}>
                {selectedUser.userDrinks.map((drink, i) => (
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
                                <ExpandMore
                                    expand={expandedDrinkId === i}
                                    onClick={()=>handleExpandDrinkClick(i)}
                                    aria-expanded={expandedDrinkId === i}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expandedDrinkId === i} timeout="auto" unmountOnExit>
                                <DrinkModal drinkId={drink.id}/>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    selectedUser: state.user.selectedUser
})

export default connect(mapStateToProps, { getUser, unsetUser })(UserProfile)