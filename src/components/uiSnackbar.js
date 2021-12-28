import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { clearSnackbar } from '../actions/actionsMessages'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const UISnackbar = ({message, clearSnackbar}) => {

    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')

    useEffect(()=>{
        setType(message.type)
    }, [message])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false)
        clearSnackbar()
    }

    return(
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%'}}>
                {message.message}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => ({
    message: state.message
})

export default connect(mapStateToProps, { clearSnackbar })(UISnackbar)