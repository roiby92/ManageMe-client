import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import ServiceProvidersRow from '../Home/PropertyDetails/Tabs/ServiceProviders/ServiceProviderRow'

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: '20px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 40,
            paddingTop: '40px',
            padding: '30px',
        },
    },
    deleteButton: {
      color: '#e74c3c'
    },
    errorMessage: {
        marginTop: '20px'
    },
    tableTitles: {
        fontWeight: 'bold'
    },
    serviceProvidersTable: {
        paddingBottom: 10,
        paddingRight: 5,
        [theme.breakpoints.up('md')]: {
            padding: 10,
        }
    }
}))

const AllServiceProv = inject('user')(observer((props) => {

    const { user, filterEmployee } = props
    const classes = useStyles()
    const [allUserServicers, setAllUserServicers] = useState([])

    const handleDelete = async (workerId) =>{
      await user.deleteServiceWorkerFromUser(workerId)
    }

    return (
        <Grid item xs={12} >
            <Hidden lgUp implementation="css">
                <Grid item xs={12} className={classes.serviceProvidersTable}>
                    {filterEmployee.length > 0
                        ?   filterEmployee.map((row) => (
                                <ServiceProvidersRow
                                    key={row.id}
                                    serviceProvider={row}
                                    rowType={0}
                                    handleDelete={handleDelete}
                                />
                            ))
                        :   <Grid item xs={12} container justify='center'>
                                <Typography variant='h6' className={classes.errorMessage}>
                                    No Service Provider Was Found
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </Hidden>
            <Hidden mdDown implementation="css">
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
                <Grid item xs={12} className={classes.serviceProvidersTable} container>
                    {filterEmployee.length > 0
                        ?   filterEmployee.map((row) => (
                                <ServiceProvidersRow
                                    key={row.id}
                                    serviceProvider={row}
                                    rowType={1}
                                    handleDelete={handleDelete}
                                />
                            ))
                        :   <Grid item xs={12} container justify='center'>
                                <Typography variant='h6' className={classes.errorMessage}>
                                    No Service Provider Was Found
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </Hidden>
        </Grid>
    )
}))

export default AllServiceProv