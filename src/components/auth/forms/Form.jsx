import { Button, Card, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import ErrorNotice from '../../misc/ErrorNotice'

const useStyles = makeStyles({
    card: {
        width: '350px',
        padding: '20px',
        paddingRight: '50px',
        paddingLeft: '50px'
    },
    subtitle: {
        color: 'grey',
        marginBottom: '20px'
    },
    form: {
        marginBottom: '10px'
    },
    textField: {
        width: '250px'
    }
})

const Form = inject('user')(observer((props) => {
    const classes = useStyles()
    const { user, error, setError, fields, handleFieldChange, handleSubmit } = props
    const [types, setTypes] = useState([])
    useEffect(()=>{
        const getUserType = async () =>{
            const typeDB = await user.loadUserTypes()
            setTypes(typeDB);
        }
        getUserType()
    }, [])

    const validateForm = () => {
        return (
          fields.email.length > 0 &&
          fields.password.length > 0 &&
          fields.password === fields.confirmPassword &&
          fields.userType !== ""
        )
    }

    return (
        <Grid item xs={12} container direction='column' alignContent='center'>
            <Card className={classes.card}>
                <Typography variant='h4' className={classes.form}>
                    SIGN UP
                </Typography>
                <Typography variant='body2' className={classes.subtitle}>
                    Please fill all the details below
                </Typography>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <form autoComplete='given-name' className={classes.form}>
                    <Typography variant="subtitle2">First Name</Typography>
                    <TextField
                        className={classes.textField}
                        name="firstName"
                        type="text"
                        value={fields.firstName}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='family-name' className={classes.form}>
                    <Typography variant="subtitle2">Last Name</Typography>
                    <TextField
                        className={classes.textField}
                        name="lastName"
                        type="text"
                        value={fields.lastName}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='email' className={classes.form}>
                    <Typography variant="subtitle2">Email</Typography>
                    <TextField
                        className={classes.textField}
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='tel' className={classes.form}>
                    <Typography variant="subtitle2">Phone</Typography>
                    <TextField
                        className={classes.textField}
                        name="phone"
                        type="tel"
                        value={fields.phone}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='new-password' className={classes.form}>
                    <Typography variant="subtitle2">Password</Typography>
                    <TextField
                        className={classes.textField}
                        name="password"
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </form>
                <form autoComplete='off' className={classes.form}>
                    <Typography variant="subtitle2">Confirm Password</Typography>
                    <TextField
                        className={classes.textField}
                        name="confirmPassword"
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </form>
                <Grid item xs={12} className={classes.form}>
                    <TextField
                        id="outlined-select-currency"
                        fullWidth
                        select
                        label="Select user type"
                        name='userType'
                        value={fields.userType}
                        onChange={handleFieldChange}
                        helperText="Please select your type"
                        SelectProps={{
                            MenuProps: {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                            }
                        }}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.type}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Button onClick={handleSubmit} variant='contained' color='primary'>
                    SUBMIT
                </Button> 
            </Card>
        </Grid>
    )

}))
export default Form