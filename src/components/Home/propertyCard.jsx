import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

    root: {
        height: '100%',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: 10,
        },
    },
    link: {
        textDecoration: 'none'
    },
    cardTitle: {
        marginBottom: '10px',
        fontSize: '1rem'
    },
    address: {
        fontSize: '0.8rem'
    }
}))

const PropertyCard = inject('user')(observer((props) => {

    const classes = useStyles()

    const { property } = props

    return (
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
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.address}>
                                {property.address}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
    )
}))

export default PropertyCard