import { Button, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment, useState } from 'react'
import {
    Check as CheckIcon,
    Close as CloseIcon
} from '@material-ui/icons'
import EditDetails from './EditDetails'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        padding: '5px',
        [theme.breakpoints.up('md')]: {
            padding: '10px',
            height:'100%'
        }
    },
    cardTitle: {
        fontWeight: 'bold'
    },
    title: {
        marginBottom: '5px',
        fontWeight: 'bold',
        [theme.breakpoints.up('md')]: {
            marginBottom: '15px',
            marginTop: '10px',
            fontWeight: 'bold',
        }
    },
    details: {
        marginBottom: '5px',
        height: 20,
        [theme.breakpoints.up('md')]: {
            marginBottom: '10px',
            height: 20,
        }
    },
    detail: {
        marginLeft: '5px',
        color: '#878787'
    },
    addButton: {
        color: '#fb8500',
        marginLeft: '10px',
        fontSize: '0.7em'
    }
}))

const DetailsCard = inject('user')(observer((props) => {

    const { user, property } = props

    const classes = useStyles()

    const [open, setOpen] = useState(false)

    const [alert, setAlert] = useState(false)

    const handleOpenEdit = () => {
        setOpen(true)
    }

    const handleCloseEdit = () => {
        setOpen(false)
    }

    async function handleSubmitEdit(updatedDetails) {
        await user.updatePropertyDetails(property.id, updatedDetails)
        handleCloseEdit()
        setAlert(true)
    }

    return (
        <Fragment>
            <Grid item xs={12} container direction='row' >
                <Typography variant='h6' className={classes.cardTitle}>
                    Details
                </Typography>
                {user.type.id === 1 ?
                <Button className={classes.addButton} onClick={handleOpenEdit}>
                    EDIT
                </Button>: null}
            </Grid>
            <EditDetails
                key={property.id}
                open={open}
                handleCloseEdit={handleCloseEdit}
                handleSubmitEdit={handleSubmitEdit}
                property={property}
            />
            <Grid item xs={12} container direction='row' className={classes.detailsContainer}>
                <Grid item xs={5} >
                    <Typography variant='subtitle1' className={classes.title}>
                        Property
                    </Typography>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Rooms:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.rooms}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Bathrooms:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.bathrooms}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Maximum guests:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.guests}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Pool:</Typography>
                        <Typography variant='body2' className={classes.detail}>
                            {property.pool ? <CheckIcon /> : <CloseIcon />}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Kitchen:</Typography>
                        <Typography variant='body2' className={classes.detail}>
                            {property.kitchen ? <CheckIcon /> : <CloseIcon />}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>AC:</Typography>
                        <Typography variant='body2' className={classes.detail}>
                            {property.ac ? <CheckIcon /> : <CloseIcon />}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Wifi:</Typography>
                        <Typography variant='body2' className={classes.detail}>
                            {property.wifi ? <CheckIcon /> : <CloseIcon />}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={7} >
                    <Typography variant='subtitle1' className={classes.title}>
                        Owner
                    </Typography>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Name:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.owner.name}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Email:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.owner.email}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Phone:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.owner.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} container direction='row' className={classes.details}>
                        <Typography variant='subtitle2'>Country:</Typography>
                        <Typography variant='body2' className={classes.detail}>{property.owner.country}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="info">
                    Changes has been successfully added!
                </Alert>
            </Snackbar>
        </Fragment>
    )
}))

export default DetailsCard