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


const useStyles = makeStyles((theme) => ({

    root: {
        height: '50%',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            marginLeft: 10,
        },
    },
    cardTitle: {
        marginBottom: '10px',
        fontSize: '1rem'
    },
    img: {
        height: "80%",
        width: "80%",
        borderRadius: "50%"
    }
}))

const ChatCard = inject('user')(observer((props) => {

    const classes = useStyles()

    const { details } = props

    const handleClick = () => {
        props.handleClick(details.id)
    }
    return (
            <Grid container xs={12}>
        <Card className={classes.root} onClick={handleClick}>
                <CardActionArea>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            image={details.img}
                            title="Contemplative Reptile"
                            className={classes.img}
                        />
                        </Grid>
                    <Grid item xs={8}>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                className={classes.cardTitle}
                            >
                                {details.firstName} {details.lastName}
                            </Typography>
                        </CardContent>
                    </Grid>
                </CardActionArea>
        </Card>
            </Grid>
    )
}))

export default ChatCard