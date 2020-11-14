import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    rootContainer:{
        marginBottom: '30px',
    },
    root: {
        maxHeight: '100%',
        maxWidth: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: 40
        },
    },
    link: {
        textDecoration: 'none'
    },
    cardTitle: {
        marginBottom: '10px'
    }
}))

const PropertyCard = inject('user')(observer((props) => {

    const classes = useStyles()

    const { property } = props

    return (
        <Grid item xs={12} md={4} container className={classes.rootContainer}>
            <Link 
                to={`/home/properties/${property.id}`} 
                className={classes.link} 
                onClick={() => localStorage.setItem('currentRoute', `/home/properties/${property.id}`)}
            >
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="180"
                            image={property.img}
                            title="Contemplative Reptile"
                            className={classes.img}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                className={classes.cardTitle}
                            >
                                {property.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {property.address}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    )
}))

export default PropertyCard