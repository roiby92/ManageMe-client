import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    textField: {
        marginBottom: '15px'
    }
})

export const OwnerDetails = (props) => {

    const classes = useStyles()

    const { open, handleChange, handleCloseDialog } = props
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        phone: '',
        country: '',
        email: ''
    })

    const handleOwnerChange = (event) => {
        setOwnerDetails({ ...ownerDetails, [event.target.name]: event.target.value })
    }

    const addOwner = () => {
        handleChange(null,ownerDetails, true)
        handleCloseDialog()
    }

    const closeOwnerDialog = () => {
        for (let p in ownerDetails) {
            ownerDetails[p] = ''
        }
        handleCloseDialog()
    }

    const validateForm = () => {
        return ( 
            ownerDetails.name.length > 0 &&
            ownerDetails.phone.length > 0 &&
            ownerDetails.country.length > 0 &&
            ownerDetails.email.length > 0
        )
    }

    return (
        <Dialog open={open} onClose={closeOwnerDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Owner</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fiil the Owner details
                </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    autoFocus
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    name="phone"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    name="country"
                    label="Country"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    name="email"
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={handleOwnerChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeOwnerDialog} color="primary">
                    Cancel
            </Button>
                <Button onClick={addOwner} color="primary" disabled={!validateForm()}>
                    ADD OWNER
            </Button>
            </DialogActions>
        </Dialog >
    )
}
