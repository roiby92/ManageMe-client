import { Grid, List, makeStyles, Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import UpdateUserForm from './UpdateUserForm'
import UpdateImg from './UpdateImg'
import DetailField from './DetailField'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 40,
            maxWidth: '70%'
        }
    },
    fields: {
        width: '100%'
    }
}))

const Profile = inject('user')(observer((props) => {
    const { user } = props
    const [fields, setFields] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        img: '',
        lastPassword: '',
        password: '',
        confirmPassword: ''
    })
    const classes = useStyles()
    const [openName, setOpenName] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [openPhone, setOpenPhone] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickName = () => {
        setOpenName(true);
    };

    const handleClickEmail = () => {
        setOpenEmail(true);
    };

    const handleClickPhone = () => {
        setOpenPhone(true);
    };

    const handleClickPassword = () => {
        setOpenPassword(true);
    };

    const genrateForm = (open, setOpen, fields) => {
        return <UpdateUserForm
            open={open}
            setOpen={setOpen}
            fields={fields}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            zeroFields={zeroFields} />
    };

    function handleFieldChange(event) {
        setFields({ ...fields, [event.target.name]: event.target.value })
    }

    function zeroFields() {
        setFields({
            ...fields,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        })
    }

    async function handleSubmit(fieldsToUpdate) {
        const newData = {}
        fieldsToUpdate.forEach(f => {
            const key = f === "firstName" ? 'first_name' : f === "lastName" ? 'last_name' : f
            newData[key] = fields[f]
        })
        await user.updateUserDetails(newData);
        setAlert(true)
    }

    return (
        <Grid className={classes.profileContainer} item xs={12} container>
            <Typography variant='h5'>
                Details
            </Typography>

            <Grid item xs={12} container>
            <List component="nav" className={classes.fields}>

                <DetailField
                    type='Name'
                    value={user.firstName + " " + user.lastName}
                    handleClick={handleClickName} />

                <DetailField
                    type='Email'
                    value={user.email}
                    handleClick={handleClickEmail} />

                <DetailField
                    type='Phone'
                    value={user.phone}
                    handleClick={handleClickPhone} />

                <DetailField
                    type='Password'
                    value='Change password'
                    handleClick={handleClickPassword} />

                <DetailField
                    type='Join Date'
                    value={moment(user.dateJoin).format('LLL')} />

                <DetailField
                    type='User Type'
                    value={user.type ? user.type.type : user.type} />
            </List>
            </Grid>

            {genrateForm(openName, setOpenName, [
                { name: "firstName", label: 'First Name', type: "name", value: fields.firstName },
                { name: "lastName", label: 'Last Name', type: "name", value: fields.lastName }
            ])}

            {genrateForm(openEmail, setOpenEmail, [
                { name: "email", label: 'Email', type: "email", value: fields.email }
            ])}

            {genrateForm(openPhone, setOpenPhone, [
                { name: "phone", label: 'Phone', type: "phone", value: fields.phone }
            ])}

            {genrateForm(openPassword, setOpenPassword, [
                { name: "lastPassword", label: 'Previous Password', type: "password", value: fields.lastPassword },
                { name: "password", label: 'New Password', type: "password", value: fields.password },
                { name: "confirmPassword", label: 'Confirm Password', type: "password", value: fields.confirmPassword }
            ])}

            <Grid item>
                <UpdateImg
                    value={fields.img}
                    handleSubmit={handleSubmit}
                    handleFieldChange={handleFieldChange} />
            </Grid>

            <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="success">
                    The details changed successfuly!
                </Alert>
            </Snackbar>
        </Grid>
    )

}))

export default Profile