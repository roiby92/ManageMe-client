import { inject, observer } from 'mobx-react'
import React from 'react'
import { TextField, makeStyles, Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    profilePicture: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
            height: '80%',
        }
    },
    imgInput: {
        margin: 8
    }
}))

const UpdateImg = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()


    return (
        <Grid item xs={12} container>

            <Grid item xs={12}>
                <Typography variant='h5'>
                    Profile Picture
                </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <img className={classes.profilePicture} src={user.img} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    name="img"
                    value={props.value}
                    label="Image"
                    className={classes.imgInput}
                    placeholder="Image URL"
                    helperText="Please enter new image address"
                    fullWidth
                    multiline
                    rows={15}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={props.handleFieldChange}
                />

                <Button
                    disabled={!props.value.length > 0}
                    onClick={() => props.handleSubmit(['img'])}>
                        Upload
                </Button>

            </Grid>

        </Grid>
    )

}))

export default UpdateImg