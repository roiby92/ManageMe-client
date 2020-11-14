import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MenuItem } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

const NewToDo = inject('user')(observer((props) => {

    const { user, open, handleClose, property } = props

    const [allUesrType, setAllUesrType] = useState([])

    useEffect(() => {
        const getAllTypes = async () => {
            const userTypes = await user.loadUserTypes()
            setAllUesrType(userTypes)
        }
        getAllTypes()

    },[])

    const [input, setInput] = useState({
        task: '',
        typeId: '',
        serviceProvider: null
    })

    async function handleInputChange(event) {
        let value = event.target.value
        if(event.target.name === 'serviceProvider' || event.target.name === 'type') {
            value = parseInt(value)
        }
        setInput({ ...input, [event.target.name]: value})
    }

    const handleFormIsValid = () => {
        return (input.task.length > 0 && input.typeId !== '')
    }

    async function handleSubmitTodo() {
        const type = allUesrType.find(t => t.id === input.typeId)
        input.type = type.type
        props.handleSubmitTodo(input)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add To Do Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Write your open task and connect it to a service provider
                </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    variant='outlined'
                    autoFocus
                    multiline
                    rows={3}
                    variant="outlined"
                    name="task"
                    label="Task"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select task's type"
                    name='typeId'
                    value={input.typeId}
                    onChange={handleInputChange}
                    helperText="Please select the task type to connect it to a service provider"
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
                    {allUesrType.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select an employee"
                    name='serviceProvider'
                    value={input.serviceProvider}
                    onChange={handleInputChange}
                    helperText="Please assign this task to one of the service providers"
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
                    {property
                        .serviceWorkers
                            .filter(w => input.typeId && w.type.id === input.typeId)
                            .map((w) => (
                                <MenuItem key={w.id} value={w.id}>
                                    {w.firstName} {w.lastName} - {w.type.type}
                                </MenuItem>
                            ))
                    }
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitTodo} color="primary" disabled={!handleFormIsValid()}>
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    )
}))

export default NewToDo