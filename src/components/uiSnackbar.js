import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSnackbar } from '../actions/actionsUser'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const UISnackbar = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const { snackBarOpen, snackBarType, snackBarMessage } = useSelector(state => state.message)

    const handleClose = () => {
        dispatch(clearSnackbar())
    }
    useEffect(()=>{
        setOpen(snackBarOpen)
    }, [snackBarOpen])

    return(
        <Snackbar
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            >
            <Alert onClose={handleClose} severity={snackBarType} sx={{ width: '100%'}}>
                {snackBarMessage}
            </Alert>
        </Snackbar>
    )
}

export default UISnackbar