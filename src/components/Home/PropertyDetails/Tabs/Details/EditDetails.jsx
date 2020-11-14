import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Checkbox, FormControlLabel, Grid, makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles({
    textField: {
        marginBottom: '15px'
    },
    fieldsContainer: {
        marginBottom: '10px'
    },
    checkBox: {
        color: '#023047',
            '&$checked': {
                color: '#023047',
            }
    }
})

const EditDetails = inject('user')(observer((props) => {

    const { user, open, handleCloseEdit, property } = props

    const classes = useStyles()

    const [isChanged, setIsChanged] = useState(true)

    const [input, setInput] = useState({
        img: property.img,
        address: property.address,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        guests: property.guests,
        pool: property.pool,
        ac: property.ac,
        wifi: property.wifi,
        kitchen: property.kitchen,
        name: property.name
    })

    async function handleInputChange(event) {
        setIsChanged(false)
        const key = event.target.name
        const value = input[key]
        if(key === 'pool' || key === 'ac' || key === 'wifi' || key === 'kitchen') {
            setInput({ ...input, [key]: !value  })
        } else {
            setInput({ ...input, [key]: event.target.value  })
        }
    }
    
    async function handleSubmitEdit() {
        props.handleSubmitEdit({
            ...input,
            rooms: parseInt(input.rooms),
            guests: parseInt(input.guests),
            bathrooms: parseInt(input.bathrooms),
        })
        handleCloseEdit()
    }

    return (
        <Dialog open={open} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add To Do Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit property details
                </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    variant="outlined"
                    name="name"
                    label="Name"
                    value={input.name}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    variant="outlined"
                    name="address"
                    label="Address"
                    value={input.address}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <Grid 
                    item 
                    xs={12} 
                    container 
                    direction='row' 
                    className={classes.fieldsContainer}
                >
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            fullWidth
                            variant='outlined'
                            variant="outlined"
                            name="rooms"
                            label="Rooms"
                            value={input.rooms}
                            type="number"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            fullWidth
                            variant='outlined'
                            variant="outlined"
                            name="bathrooms"
                            label="Bathrooms"
                            value={input.bathrooms}
                            type="number"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            fullWidth
                            variant='outlined'
                            variant="outlined"
                            name="guests"
                            label="Guests"
                            value={input.guests}
                            type="number"
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    container 
                    direction='row' 
                    className={classes.fieldsContainer}
                    align='center'
                >
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox 
                                    name="pool"
                                    color="primary" 
                                    checked={input.pool}
                                    onChange={handleInputChange}
                                />
                            }
                            label="Pool"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox 
                                    name='ac'
                                    color="primary" 
                                    checked={input.ac}
                                    onChange={handleInputChange}
                                />
                            }
                            label="AC"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox 
                                    name='wifi'
                                    color="primary" 
                                    checked={input.wifi}
                                    onChange={handleInputChange}
                                />
                            }
                            label="Wifi"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox
                                    name='kitchen' 
                                    color="primary" 
                                    checked={input.kitchen}
                                    onChange={handleInputChange}
                                />
                            }
                            label="Kitchen"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                </Grid>
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    variant="outlined"
                    name="img"
                    label="Image"
                    value={input.img}
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitEdit} color="primary" disabled={isChanged}>
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    )
}))

export default EditDetails