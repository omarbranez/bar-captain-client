import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser, unsetUser } from '../actions/actionsUser'

const UserProfile = ({getUser, unsetUser, user, selectedUser}) => {

    const {userId} = useParams()

    useEffect(()=>{
        getUser(userId)
        return unsetUser
    }, [getUser, userId, user.userProducts, unsetUser])
    
    return(
        <div>
            {selectedUser &&
            <div>
            <h2>{selectedUser.username}'s Profile</h2>
            <span>Liquor Cabinet:</span>
            {selectedUser.userProducts.map(up => <ul>{up.name}</ul>)}
            <span>Drink Collection:</span>
            {selectedUser.userDrinks.map(ud => <ul>{ud.name}</ul>)}
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    selectedUser: state.user.selectedUser
})

export default connect(mapStateToProps, { getUser, unsetUser })(UserProfile)