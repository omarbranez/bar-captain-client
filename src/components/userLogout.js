import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/actionsUser'

const UserLogout = ({logoutUser}) => {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            logoutUser(navigate)
        }, 1500) 
        return () => clearTimeout(timer)
    })

    return(
        <h2>You have been logged out. Redirecting you to the Login Page!</h2>
    )
}

export default connect(null, {logoutUser})(UserLogout)