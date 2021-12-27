import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserProfile = ({user}) => {

    const {userId} = useParams()
    console.log(user.userProducts)
    return(
        <div>
            <p>{user.username}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UserProfile)