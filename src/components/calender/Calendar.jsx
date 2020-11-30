import { Grid, makeStyles, Typography, TextField, MenuItem} from '@material-ui/core'
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
    const [format, setFormat] = useState("month")

    const fetchBooking = () => {
        const newBooking = []
        // const colors = ['#FFC107', '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#34495e', '#FC427B', '#7f8c8d', '#BDC581', '#e67e22']
        const colors = ['#FEA47F', '#25CCF7', '#EAB543', '#55E6C1', '#CAD3C8', '#F97F51', '#1B9CFC', '#F8EFBA', '#58B19F', '#2C3A47', '#B33771', '#3B3B98', '#FD7272', '#9AECDB', '#D6A2E8', '#6D214F', '#182C61', '#FC427B', '#BDC581', '#82589F']
        user.properties.forEach((p, i) => {
            p.booking.forEach(({startDate, endDate, ...b}) => {
                newBooking.push({
                    title: b.channel ? "Booking" : b.name,
                    color: colors[i],
                    startDate: startDate.length > 22 ? startDate.substring(0, startDate.length - 8) : startDate,
                    endDate: endDate.length > 22 ? endDate.substring(0, endDate.length - 8) : endDate,
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
                    <TextField
                        id="format"
                        select
                        value={format}
                        onChange={(e)=> setFormat(e.target.value)}
                        helperText="Select format"
                    >
                        <MenuItem value="month">
                                monthly
                        </MenuItem>
                        <MenuItem value="week">
                                weekly
                        </MenuItem>
                        <MenuItem value="day">
                                daily
                        </MenuItem>
                    </TextField>
                     Properties Schedule
        </Typography>
            </Grid>
            <CalendarBoard booking={booking} fetchBooking={fetchBooking} format={format} />
        </Grid >
    )
}))
export default Calendar