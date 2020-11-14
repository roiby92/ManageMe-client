import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Divider,
    Tabs,
    Tab,
    Button
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import ToDos from './Tabs/ToDos/ToDos';
import PropertyCalendar from './Tabs/PropertyCalendar'
import DetailsCard from './Tabs/Details/DetailsCard'
import PropertyServiceProviders from './Tabs/ServiceProviders/PropertyServiceProviders'
import { Redirect, useHistory } from 'react-router-dom';
import Loader from '../../Layout/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingTop: '5px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 40
        },
        height: '100%'
    },
    cardHead: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    img: {
        height: '100px',
        width: '150px',
        borderRadius: '5px',
        boxShadow: '0px 0px 3px black'
    },
    deleteButton: {
        color: '#fb8500',
        fontSize: '0.7em'
    },
    cardDetails: {
        marginTop: '15px'
    },
    detailsContainer: {
        marginBottom: '10px'
    }
}))

const PropertyDetails = inject('user')(observer((props) => {

    const classes = useStyles()

    const { user, propertyId } = props

    const property = user.properties.find(p => p.id === parseInt(propertyId))

    const [value, setValue] = useState(0);

    const history = useHistory()

    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleDelete = () => {
        user.deleteProperty(property.id)
        history.push('/home/properties')
    }
    if(user.properties.length > 0)
        { return (
            <Grid item xs={12} container className={classes.detailsContainer}>
                <Card className={classes.root}>
                    <CardContent>
                        <Grid item xs={12} container direction='row' className={classes.cardHead} alignItems='flex-end'> 
                            <Grid item xs={7}>
                                <Typography variant='h5'>
                                    {property.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {property.address}
                                </Typography>
                                <Button className={classes.deleteButton} size='small' onClick={handleDelete}>DELETE PROPERTY</Button> 
                            </Grid> 
                            <Grid item xs={5} container justify='flex-end'>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    className={classes.img}
                                    image={property.img}
                                    title="Contemplative Reptile"
                                />
                            </Grid>
                        </ Grid>
                        <Divider />
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Details" {...a11yProps(0)} />
                            <Tab label="Calendar" {...a11yProps(1)} />
                            <Tab label="To Dos" {...a11yProps(2)} />
                            <Tab label="Service Providers" {...a11yProps(3)} />
                        </Tabs>
                        <Grid 
                            hidden={value !== 0}
                            item 
                            xs={12} 
                            className={classes.cardDetails}
                        >
                            <DetailsCard property={property} />
                        </Grid>
                        <Grid 
                            hidden={value !== 1}
                            item 
                            xs={12} 
                            className={classes.cardDetails}
                        >
                            <PropertyCalendar value={value} bookings={property.booking}/>
                        </Grid>
                        <Grid 
                            hidden={value !== 2}
                            item 
                            xs={12} 
                            className={classes.cardDetails}
                        >
                            <ToDos toDos={property.todoList} property={property} />
                        </Grid>
                        <Grid 
                            hidden={value !== 3}
                            item 
                            xs={12} 
                            className={classes.cardDetails}
                        >
                            <PropertyServiceProviders property={property}/>
                        </Grid>           
                    </CardContent> 
                </Card>
            </Grid>
        )}
    else {
        return <Loader />
    }
}))

export default PropertyDetails