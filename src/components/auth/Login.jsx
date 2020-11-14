import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Grid, InputBase, makeStyles, Paper, Typography } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import { Auth } from 'aws-amplify'
import logo from '../../HatchfulExport-All/logo_transparent2.png'
import { inject, observer } from "mobx-react"
import Loader from "../Layout/Loader";

const useStyles = makeStyles((theme) => ({
    paperCard:{
        width: '100%'
    },
    logo:{
        height: '250px'
    },
    title:{
        fontFamily: "'Montserrat', sans-serif",
        marginBottom: '25px'
    },
    error: {
        color: '#d00000'
    },
    inputContainer: {
        marginTop: '25px',
        marginBottom: '45px'
    },
    inputPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        padding: '3px',
        marginRight: '10px'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    button: {
        width: '100%',
        backgroundColor: '#023047',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '35px'
    }
}))

const Login = inject('user')(observer((props) => {

    const {user} = props

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const submit = async (e) => {
        setIsLoading(true)
        try {
            await Auth.signIn(email, password)
            await user.userHasAuthenticated(email, true)
            history.push('/home/properties')
        } catch (err) {
            setIsLoading(false)
            err.message && setError(err.message)
        }
    }


    return (
        <div id='login-signup-card'>
            {isLoading
                ?   <Loader />
                :   <Grid item xs={12} md={4} container className={classes.paperLoginContainer}>
                        <Paper elevation={3} className={classes.paperCard}>
                            <Grid item xs={12} container justify='center' alignItems='center' direction='column'>
                                <img src={logo} alt='logo' className={classes.logo}/>
                                <Typography variant="h5" className={classes.title}>
                                    Login
                                </Typography>
                                <Grid item xs={12} hidden={!error}>
                                    <Typography variant='body2' className={classes.error}>
                                        {error}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} className={classes.inputContainer}>
                                    <Paper component="form" className={classes.inputPaper} >
                                        <EmailIcon className={classes.icon} />
                                        <InputBase
                                            className={classes.margin}
                                            fullWidth
                                            id="input-with-icon-textfield"
                                            placeholder="Email"
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Paper>
                                </Grid>

                                <Grid item xs={10} className={classes.inputContainer}>
                                    <Paper component="form" className={classes.inputPaper} >
                                        <LockIcon className={classes.icon} />
                                        <InputBase
                                            className={classes.margin}
                                            fullWidth
                                            id="input-with-icon-textfield"
                                            placeholder="Password"
                                            type='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Paper>
                                </Grid>

                            </Grid>
                            <Typography variant='subtitle1'>
                                Not a user? <Link to='/signup'>Sign Up</Link>
                            </Typography>
                            <Button
                                onClick={submit}
                                variant='contained'
                                className={classes.button}
                            >
                                SEND
                            </Button>
                        </Paper>
                </Grid>
            }
        </div>
    )
}))

export default Login