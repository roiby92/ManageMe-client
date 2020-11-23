import { Grid, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import CalendarBoard from './CalendarBoard'

const useStyles = makeStyles((theme) => ({
    cardDetails: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 40,
        },
    },
    title: {
        marginBottom: '10px'
    }
}))

const Calendar = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()
    const [booking, setBooking] = useState([])

    const fetchBooking = () => {
        const newBooking = []
        const colors = ['#FFC107', '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#34495e', '#FC427B', '#7f8c8d', '#BDC581', '#e67e22']
        user.properties.forEach((p, i) => {
            p.booking.forEach(({startDate, endDate, ...b}) => {
                newBooking.push({
                    title: b.channel ? "Booking" : b.name,
                    color: colors[i],
                    startDate: startDate.substring(0, startDate.length - 8),
                    endDate: endDate.substring(0, endDate.length - 8),
                    ...b
                })
            })
        })
        setBooking(newBooking)
    }

    useEffect(fetchBooking, [])

    return (
        <Grid
            item
            xs={12}
            className={classes.cardDetails}
        >
            <Grid
                container
                item
                xs={12}
            >
                <Typography variant='h5' className={classes.title}>
                    All properties Schedule
        </Typography>
            </Grid>
            <CalendarBoard booking={booking} fetchBooking={fetchBooking} />
        </Grid >
    )
}))
export default Calendar