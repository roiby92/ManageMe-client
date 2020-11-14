import { inject, observer } from 'mobx-react';
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles';
import { OwnerDetails } from './OwnerDetails';
import { Checkbox, FormControlLabel, Grid, MenuItem, Typography } from '@material-ui/core';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    textField: {
        marginBottom: '15px'
    },
    addOwner: {
        height: '100%',
        width: '100%'
    }
}));

const AddProperty = inject('user')(observer((props) => {
    const classes = useStyles();
    const [ownersList, setOwnersList] = useState([])
    const { open, handleCloseAddDialog, user } = props
    useEffect(() => {
        const getOwnerList = async () => {
            const dbList = await user.getOwnerList()
            setOwnersList(dbList)
        }
        getOwnerList()
    }, [])
    const [openOwnerDialog, setOpenOwnerDialog] = useState(false)

    const [propertyDetails, setPropertyDitails] = useState({
        name: '',
        address: '',
        img: '',
        owner: '',
        rooms: '',
        bathrooms: '',
        guests: '',
        kitchen: false,
        ac: false,
        wifi: false,
        pool: false,
    })

    const handleChange = event => {
        const key = event.target.name
        const value = propertyDetails[key]
        if(key === 'pool' || key === 'ac' || key === 'wifi' || key === 'kitchen') {
            setPropertyDitails({ ...propertyDetails, [key]: !value  })
        } else {
            setPropertyDitails({ ...propertyDetails, [key]: event.target.value  })
        }

    }

    const handleChangeOwner = (event, owner, fromOwnerDialog = false) => {
        if (fromOwnerDialog) {
            return setPropertyDitails({ ...propertyDetails, owner: owner })
        }
        const SelectedOwner = ownersList.find(o => o.name === event.target.value)
        setPropertyDitails({ ...propertyDetails, owner: { ...SelectedOwner } })
    }

    const handleSubmitProperty = async () => {
        await user.addNewProperty(propertyDetails)
        handleClosePropertyDialog(false)

    }

    const handleOpenOwnerDialog = () => {
        setOpenOwnerDialog(true)
    }

    const handleCloseOwnerDialog = () => {
        setOpenOwnerDialog(false)
    }

    const handleClosePropertyDialog = () => {
        for (let i = 0; i < propertyDetails; i++) {
            propertyDetails[i] = ''
            if (i >= 8) {
                propertyDetails[i] = false
            }
        }
        handleCloseAddDialog()
    }
    
    return (
        <Dialog open={open} onClose={handleClosePropertyDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Property</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fiil the Property details in the form below
            </DialogContentText>
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    autoFocus
                    name="name"
                    label=" Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    name="address"
                    label="address"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    id='outlined-multiline-static'
                    className={classes.textField}
                    variant='outlined'
                    multiline
                    rows={2}
                    name="img"
                    label="Imag URL"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <Grid 
                    item
                    xs={12}
                    container 
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.textField}
                >
                    <Grid xs={5}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            variant='outlined'
                            label="Select owner from a list"
                            name='owner'
                            onChange={handleChangeOwner}
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
                            {ownersList.map(owner => (
                                <MenuItem id={owner.id} value={owner.name}>
                                    {owner.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={2} container justify='center'>
                        <Typography variant='subtitle1'>
                            OR
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        {openOwnerDialog ?
                            <OwnerDetails
                                open={openOwnerDialog}
                                handleChange={handleChangeOwner}
                                handleCloseDialog={handleCloseOwnerDialog}
                            /> :
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenOwnerDialog}
                                className={classes.addOwner}
                            >
                                Create New Owner
                            </Button>
                        }
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    container 
                    direction='row' 
                    className={classes.textField}
                >
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            variant='outlined'
                            name="rooms"
                            label="Rooms"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            variant='outlined'
                            name="bathrooms"
                            label="Bathrooms"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='outlined-multiline-static'
                            variant='outlined'
                            name="guests"
                            label="Guests"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    container 
                    direction='row' 
                    className={classes.textField}
                    align='center'
                >
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox 
                                    name="kitchen"
                                    color="primary" 
                                    onChange={handleChange}
                                    checked={propertyDetails.kitchen}
                                />
                            }
                            label="Kitchen"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            value="bottom"
                            control={
                                <Checkbox 
                                    name="pool"
                                    color="primary" 
                                    onChange={handleChange}
                                    checked={propertyDetails.pool}
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
                                    name="ac"
                                    color="primary" 
                                    onChange={handleChange}
                                    checked={propertyDetails.ac}
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
                                    name="wifi"
                                    color="primary" 
                                    onChange={handleChange}
                                    checked={propertyDetails.wifi}
                                />
                            }
                            label="Wifi"
                            labelPlacement="bottom"
                        /> 
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePropertyDialog} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmitProperty} color="primary">
                    ADD
            </Button>
            </DialogActions>
        </Dialog >
    )
}))

export default AddProperty;
