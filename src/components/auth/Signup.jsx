import { Auth } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import ConfirmForm from './forms/ConfimForm';
import Form from './forms/Form';

const Signup = inject('user')(observer((props) => {

    const { user } = props

    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userType: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    })

    const history = useHistory()
    const [newUser, setNewUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const newUser = await Auth.signUp({
              username: fields.email,
              password: fields.password,
            })
            setIsLoading(false)
            setNewUser(newUser)
        } catch (err) {
            err.message && setError(err.message)
            setIsLoading(false)
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode)
            await Auth.signIn(fields.email, fields.password)
            await user.addNewUser({
                firstName: fields.firstName,
                lastName: fields.lastName,
                email: fields.email,
                phone: fields.phone,
                userType: fields.userType,
            })
            user.userHasAuthenticated(fields.email, true)
            history.push("/home/properties")
        } catch (err) {
            err.message && setError(err.message)
            setIsLoading(false)
        }
    }

    async function handleFieldChange(event) {
        setFields({ ...fields, [event.target.name]: event.target.value})
    }

    return (
        <div id="login-signup-card">
          {newUser === null
            ?   <Form
                    error={error}
                    setError={setError}
                    fields={fields}
                    handleSubmit={handleSubmit}
                    handleFieldChange={handleFieldChange}
                />
            :   <ConfirmForm
                    error={error}
                    setError={setError}
                    fields={fields}
                    handleFieldChange={handleFieldChange}
                    handleConfirmationSubmit={handleConfirmationSubmit}
                    validateConfirmationForm={validateConfirmationForm}
                />
        }
        </div>
      )

}))

export default Signup