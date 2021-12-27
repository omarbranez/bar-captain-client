import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserProfileRedirect = ({user}) => {
    
    const navigate = useNavigate()

    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate(`/users/${user.id}`)
        }, 1500)
        return () => clearTimeout(timer)
    }, [user])
    // console.log(user.id)

    return(
        <h2>Login Successful! Redirecting you to your Profile!</h2>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UserProfileRedirect)