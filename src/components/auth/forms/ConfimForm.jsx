import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import ErrorNotice from '../../misc/ErrorNotice'

export default function ConfirmForm(props) {

    const {
        fields,  
        handleFieldChange, 
        handleConfirmationSubmit, 
        validateConfirmationForm 
    } = props

    const [error, setError] = useState()

    async function handleSendEmailAgain() {
        return await Auth.resendSignUp(fields.email)
    }

    return (
        <Grid>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form autoComplete='given-name'>
                <Typography variant="subtitle2">Confirmation Code</Typography>
                <TextField
                    name="confirmationCode"
                    type="text"
                    value={fields.confirmationCode}
                    onChange={handleFieldChange}
                    helperText='Please check your email for the code'
                />
            </form>
            <form onSubmit={handleConfirmationSubmit}>
                <Grid>
                    <TextField
                        type='submit'
                        disabled={!validateConfirmationForm()}
                    />
                </Grid>
            </form>
            <form onSubmit={handleConfirmationSubmit}>
                <Typography variant='subtitle1'>
                    Didn't get our mail? <Button onClick={handleSendEmailAgain}>Send again</Button>
                </Typography>
            </form>
        </Grid>
    )

}