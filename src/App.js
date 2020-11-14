import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Auth } from "aws-amplify"
import './App.css'
import { inject, observer } from 'mobx-react'
import Routes from './components/AppRoutes'
import { Redirect, useHistory } from 'react-router-dom';
import Loader from './components/Layout/Loader';

const App = inject('user')(observer((props) => {

  const { user } = props

  const [IsAuthenticating, setIsAuthenticating] = useState(true)

  const history = useHistory()

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    try {
      const session = await Auth.currentSession()
      await user.userHasAuthenticated(session.idToken.payload.email, true)
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }
    await setIsAuthenticating(false)
  }

  return (
    <Grid item xs={12} container >
      {IsAuthenticating
        ? <Loader />
        : <Routes />
      }     
    </Grid>
  )
}))


export default App;
