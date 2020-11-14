import { makeStyles, Typography, CssBaseline, Hidden, Grid, Button, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { inject, observer } from 'mobx-react'
import React, { Fragment, useState } from 'react'
import NewServiceProvider from './NewServiceProvider'
import ServiceProvidersRow from './ServiceProviderRow'

const useStyles = makeStyles((theme) => ({
    addButton: {
        color: '#fb8500',
        marginLeft: '10px',
        fontSize: '0.7em'
    },
    tableCell: {
        marginBottom: '5px',
        marginTop: '10px'
    },
    tableTitles: {
        fontWeight: 'bold'
    }
}))

const PropertyServiceProviders = inject('user')(observer((props) => {  

    const { user, property } = props

    const serviceProviders = property.serviceWorkers

    const [openNew, setOpenNew] = useState(false)

    const [alert, setAlert] = useState({add: false, delete: false})

    const findAvailableProviders = function() {
        const providers = []
        for(let worker of user.serviceWorkers) {
            const provider = serviceProviders.find(p => p.id === worker.id)
            !provider && providers.push(worker)
        }
        return providers
    }
    
    const availableProviders = findAvailableProviders()
    

    const handleOpenNewService = () => {
        setOpenNew(true);
      }
    
    const handleClose = () => {
        setOpenNew(false);
    }

    const handleSubmitService = async function(workerId) {
        await user.addNewServiceProperty(property.id, workerId)
        handleClose()
        setAlert({...alert, add: true})
    }

    const handleDelete = async function(workerId) {
        await user.deleteServiceWorkerFromProperty(property.id, workerId)
        setAlert({...alert, delete: true})
    }

    const classes = useStyles()

    return (
        <Fragment>
            <Grid item xs={12} container direction='row' >
                <Typography variant='h6'>
                    Service Providers
                </Typography>
                <Button className={classes.addButton} onClick={handleOpenNewService}>NEW SERVICE PROVIDER</Button> 
            </Grid>
            <CssBaseline />
            <Hidden mdUp implementation="css">
                {serviceProviders
                    .map(p => 
                        <ServiceProvidersRow 
                            key={p.id} 
                            serviceProvider={p} 
                            rowType={0}
                            handleDelete={handleDelete}
                        />
                    )
                } 
            </Hidden>
            <Hidden smDown implementation="css">
            <Grid 
                    item 
                    xs={12} 
                    container 
                    direction='row' 
                    className={classes.tableCell}
                    alignItems='center'
                >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1' className={classes.tableTitles}>
                            First Name
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1' className={classes.tableTitles}>
                            Last Name
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1' className={classes.tableTitles}>
                            Type
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='body1' className={classes.tableTitles}>
                            Email
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1' className={classes.tableTitles}>
                            Phone
                        </Typography>
                    </Grid>
                </Grid>
                {serviceProviders
                    .map(p => 
                        <ServiceProvidersRow 
                            key={p.id} 
                            serviceProvider={p} 
                            rowType={1}
                            handleDelete={handleDelete}
                        />
                    )
                }
            </Hidden>
            <NewServiceProvider 
                open={openNew} 
                availableProviders={availableProviders}
                handleClose={handleClose}
                handleSubmitService={handleSubmitService}
            />
            <Snackbar open={alert.add} autoHideDuration={6000} onClose={() => setAlert({...alert, add: false})}>
                <Alert onClose={() => setAlert({...alert, add: false})} severity="info">
                    Service Provider has been successfully added!
                </Alert>
            </Snackbar>
            <Snackbar open={alert.delete} autoHideDuration={6000} onClose={() => setAlert({...alert, delete: false})}>
                <Alert onClose={() => setAlert({...alert, delete: false})} severity="info">
                Service Provider has been successfully removed!
                </Alert>
            </Snackbar>
        </Fragment>
    )
}))

export default PropertyServiceProviders