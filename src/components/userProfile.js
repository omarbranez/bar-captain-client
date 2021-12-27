import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser, unsetUser } from '../actions/actionsUser'

const UserProfile = ({selectedUser, getUser, unsetUser}) => {

    const {userId} = useParams()
    // console.log(userId)
    useEffect(()=>{
        getUser(userId)
        return unsetUser
    }, [getUser, userId, unsetUser])
    
    // console.log(selectedUser)


    return(
        <div>
            {selectedUser ? 
            <div>
            <h2>{selectedUser.username}'s Profile</h2>
            <span>Liquor Cabinet:</span>
            {selectedUser.userProducts.map(up => <ul>{up.name}</ul>)}
            <span>Drink Collection:</span>
            {selectedUser.userDrinks.map(ud => <ul>{ud.name}</ul>)}
            </div>
            : <h2>Loading</h2>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user,
    selectedUser: state.user.selectedUser
})

export default connect(mapStateToProps, { getUser, unsetUser })(UserProfile)