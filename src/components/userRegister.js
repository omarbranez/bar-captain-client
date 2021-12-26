import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { createUser, } from '../actions/actionsUser'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'

const UserRegister = ({createUser}) => {

    const [username, setUsername] = useState('')
    const [values, setValues] = useState({
        password: '',
        passwordConfirmation: '',
        showPassword: false,
        showPasswordConfirmation: false,
    })
    const [pOpen, setPOpen] = useState(false)
    const [pcOpen, setPcOpen] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        values.password === values.passwordConfirmation ? createUser({ username: username, password: values.password}, navigate) : alert("Passwords do not match")
    }

    const handleClickShowPassword = (e) => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const handleClickShowPasswordConfirmation = (e) => {
        setValues({
            ...values,
            showPasswordConfirmation: !values.showPasswordConfirmation
        })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }
      
    return (
        <div>
        <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
    >
        <h1 style={{margin: '0 auto'}}>New BarCaptain Account</h1>
        <TextField
            id="outlined-name"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => setValues({...values, password: e.target.value})}
                    endAdornment={
                        <InputAdornment position="end">
                        <Tooltip title={values.showPassword ? 'Hide Password' : 'Show Password'} placement='top-start' open={pOpen} disableHoverListener disableFocusListener>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseEnter={()=>setPOpen(true)}
                            onMouseLeave={()=>setPOpen(false)}
                            edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </Tooltip>
                        </InputAdornment>
                    }
                label="Password"
            />
        </FormControl>
            <br/>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
                    type={values.showPasswordConfirmation ? 'text' : 'password'}
                    value={values.passwordConfirmation}
                    onChange={(e) => setValues({...values, passwordConfirmation: e.target.value})}
                    endAdornment={
                        <InputAdornment position="end">
                        <Tooltip title={values.showPasswordConfirmation ? 'Hide Password' : 'Show Password'} placement='top-start' open={pcOpen} disableHoverListener disableFocusListener>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirmation}
                            onMouseDown={handleMouseDownPassword}
                            onMouseEnter={()=>setPcOpen(true)}
                            onMouseLeave={()=>setPcOpen(false)}
                            edge="end"
                        >
                        {values.showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </Tooltip>
                        </InputAdornment>
                    }
                label="Confirm Password"
                />
    </FormControl>
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Link to={'/login'}>
            <p>Already registered? <Button variant="contained">Log In</Button></p>
        </Link>
    </Box>
    </div>
    )
}

export default connect(null, { createUser})(UserRegister)