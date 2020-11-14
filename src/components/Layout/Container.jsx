import { Grid, makeStyles } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import { useHistory, BrowserRouter as Router, Route, Redirect, IndexRoute } from 'react-router-dom'
import Calendar from '../calender/Calendar'
import Properties from '../Home/Properties'
import Menu from './Menu'
import Profile from '../profile/Profile'
import ServiceProvMain from '../serviceProviders/serviceProvMain'
import Charts from '../charts/Charts'
import Chat from '../chat/Chat'
import SettingComponent from '../settings/SettingComponent'
import Todos from '../allTodos/AllTodos'
import About from '../About/About'

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        padding: '20px',
        paddingBottom: '0px',
        height: '88vh',
        marginBottom: '10px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 160,
            paddingTop: '40px',
            padding: '30px',
            height: '90vh'
        },
    }
}))

const Container = inject('user')(observer((props) => {

    const classes = useStyles()

    const history = useHistory()

    const { user } = props

    async function handleLogout() {
        await Auth.signOut()
        await user.userHasAuthenticated(false)
        history.push('/login')  
        localStorage.clear()
    }

    return (
            <Grid item xs={12} container className={classes.container} alignItems='flex-start'>
                <Menu handleLogout={handleLogout} />
                <Grid
                    item
                    xs={12}
                    className={classes.homeContainer}
                    container

                >
                    <Route
                    exact path='/home/properties'
                    render={({ match }) =>
                        <Properties
                            match={match}
                        />
                    }
                    />
                    <Route
                        path='/home/properties/:propertyId'
                        render={({ match }) =>
                            <Properties
                                match={match}
                            />
                        }
                    />
                    <Route
                        path='/home/calendar'
                        exact render={({ match }) =>
                            <Calendar
                                match={match}
                            />
                        }
                    />
                    <Route
                        path='/home/profile'
                        exact render={() =>
                            <Profile />
                        }
                    />
                    <Route
                        path='/home/serviceproviders'
                        exact render={() =>
                            <ServiceProvMain />
                        }
                    />
                    <Route
                        path='/home/charts'
                        exact render={() =>
                            <Charts />
                        }
                    />
                    <Route
                        path='/home/chat'
                        exact render={() =>
                            <Chat />
                        }
                    />
                    <Route
                        path='/home/settings'
                        exact render={() =>
                            <SettingComponent />
                        }
                    />
                    <Route
                        path='/home/allTodos'
                        exact render={() =>
                            <Todos />
                        }
                    />
                    <Route 
                        path='/home/aboutus'
                        exact render={() =>
                            <About />
                        }
                    />     
                </Grid>
            </Grid>
    )

}))

export default Container