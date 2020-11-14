import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, MenuItem } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles({
    textField: {
        marginBottom: '15px'
    }
})

const AddServicer = inject('user')(observer((props) => {

    const classes = useStyles()
    const { user, handleCloseAddDialog, open} = props
    const [allUesrType, setAllUesrType] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        const getAllTypes = async () => {
            let userTypes = await user.loadUserTypes()

            userTypes = userTypes.filter(t => t.id != 1)
            setAllUesrType(userTypes)

        }
        getAllTypes()

    }, [])

    const addNewServiceProvider = () => {
        const serviceProvider = {
            firstName,
            lastName,
            email,
            phone,
            userType: parseInt(type)
        }
        user.addNewManagerEmployee(serviceProvider)
        handleCloseAddDialog()
}


    const handleClosePropertyDialog = () => {
        handleCloseAddDialog()
    }

    return (
        <Dialog open={open} onClose={handleClosePropertyDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Servicer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fiil the Servicer details in the form below
            </DialogContentText>
            <Grid item xs={12} container>
                <Grid item xs={6}>
                    <TextField
                        id='outlined-multiline-static'
                        className={classes.textField}
                        fullWidth
                        variant='outlined'
                        autoFocus
                        variant="outlined"
                        label="First Name"
                        type="text"
                        onChange={(e) => { setFirstName(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id='outlined-multiline-static'
                        fullWidth
                        className={classes.textField}
                        variant='outlined'
                        label="Last Name"
                        type="text"
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                </Grid>
            </Grid>
            <TextField
                id='outlined-multiline-static'
                className={classes.textField}
                variant='outlined'
                label="Email"
                type="text"
                fullWidth
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
                id='outlined-multiline-static'
                className={classes.textField}
                variant='outlined'
                label="Phone"
                type="text"
                fullWidth
                onChange={(e) => { setPhone(e.target.value) }}
            />
            <TextField
                id="outlined-select-currency"
                className={classes.textField}
                select
                label="Select Type"
                name='type'
                onChange={(e) => { setType(e.target.value) }}
                fullWidth
                SelectProps={{
                    MenuProps: {
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }
                }}
            >
                {allUesrType.map(t => (
                    <MenuItem id={t.id} value={t.id}>
                        {t.type}
                    </MenuItem>
                ))}
            </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePropertyDialog} color="primary">
                    Cancel
            </Button>
                <Button
                disabled={!(firstName && lastName && email && phone && type)}
                onClick={addNewServiceProvider} color="primary">
                    ADD
            </Button>
            </DialogActions>
        </Dialog >
    )
}))

export default AddServicer;
