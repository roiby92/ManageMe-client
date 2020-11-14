import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './App';
import AuthConfig from './config/AuthConfig';
import { Amplify } from 'aws-amplify';
import User from './Stores/User'
import reportWebVitals from './reportWebVitals';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: AuthConfig.cognito.REGION,
    userPoolId: AuthConfig.cognito.USER_POOL_ID,
    identityPoolId: AuthConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: AuthConfig.cognito.APP_CLIENT_ID
  },
})

const user = new User()

ReactDOM.render(
  <React.StrictMode>
    <Provider user={user}>
      <Router>
        <App />
      </Router> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals();
