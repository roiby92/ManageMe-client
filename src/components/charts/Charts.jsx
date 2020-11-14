import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography, Paper, Badge } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import TodosChart from './PieChart';

const useStyles = makeStyles((theme) => ({
    chartsContainer: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 200,
            maxWidth: '70%'
        }
    },
    fields: {
        width: '100%'
    }
}))

const Charts = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()



    const [bookingDistribution, setBookingDistribution] = useState ([])
    const [allTodoComplete, setAllTodoComplete ] = useState ([])

    useEffect(() => {
        const feachDataFromDB = async () => {
            const mostBookingForUser = await user.getMostBookingForUser()
            setBookingDistribution(mostBookingForUser.filter(b => b.channel !== "undefined" && b.channel !== null))
            // user.mostBookingApartment()
        }
        feachDataFromDB()
    }, [])


    return (
        <Grid className={classes.chartsContainer} container item xs={12} >
            <Grid items xs={6}>
                <ResponsiveContainer width='100%' height={400} >
                    <BarChart data={bookingDistribution}>
                        <XAxis dataKey="channel" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="numberOfBooking" fill="#8884d8" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid items xs={6}>
                <TodosChart />
            </Grid>
        </Grid>
    )

}))

export default Charts