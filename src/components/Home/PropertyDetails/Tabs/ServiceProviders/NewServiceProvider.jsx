import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MenuItem } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

const NewServiceProvider = inject('user')(observer((props) => {

    const { open, availableProviders, handleClose } = props

    const [input, setInput] = useState()

    async function handleInputChange(event) {
        setInput(event.target.value)
    }
    
    async function handleSubmitService() {
        props.handleSubmitService(input)
        setInput('')
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Service Provider</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Connect this property to an employee from your service worker's list
                </DialogContentText>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Service Provider"
                        name='type'
                        value={input}
                        onChange={handleInputChange}
                        helperText="Please select a service provider from the list"
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
                        {availableProviders.map((worker) => (
                            <MenuItem key={worker.id} value={worker.id}>
                                {worker.firstName} {worker.lastName} - {worker.type.type}
                            </MenuItem>
                        ))}
                    </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitService} color="primary">
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    )
}))

export default NewServiceProvider