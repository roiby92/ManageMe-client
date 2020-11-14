import { Grid, List, ListItem, Divider, ListItemText, TextField, makeStyles, Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { inject, observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';


const useStyles = makeStyles((theme) => ({
    profileContainer: {
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




const SettingComponent = inject('user')(observer((props) => {
    const { user } = props

    const classes = useStyles()

    const [product] = useState({
        name: "monthly subscription",
        price: 1.00
    })

    const handelToken = (token, address) => {
        console.log(token, address );
    }

    return (
        <Grid id='about' className={classes.profileContainer} item xs={12} container>
           <StripeCheckout
                stripeKey="pk_test_3WjYq4hBoeSnhJArTXu73fjg002EzDTEkj"
                token={handelToken}
                billingAddress
                amount = {product.price}
            />
        </Grid>
    )

}))

export default SettingComponent