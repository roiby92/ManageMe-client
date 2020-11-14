import React from 'react'
import { inject, observer } from 'mobx-react'
import { ListItemText, ListItem, Grid } from '@material-ui/core'


const DetailField = inject('user')(observer((props) => {
    const { type, value, handleClick } = props

    return (
        <Grid item xs={12}>
            <ListItem button onClick={handleClick} divider>
                <Grid item item xs={5} sm={9}>
                    <ListItemText primary={type} />
                </Grid>
                <Grid item item xs={7} sm={3}>
                    <ListItemText primary={value} />
                </Grid>
            </ListItem>
        </Grid>
    )

}))

export default DetailField