import React from 'react'
import { inject, observer } from 'mobx-react'
import { ListItemText, ListItem, Grid } from '@material-ui/core'


const DetailField = inject('user')(observer((props) => {
    const { type, value, handleClick } = props

    return (
        
        <ListItem button onClick={handleClick} divider disabled={type === 'Join Date' || type === 'User Type'}>
            <Grid item xs={12} container justify='end'>
                <Grid item item xs={4} md={5}>
                    <ListItemText primary={type} />
                </Grid>
                <Grid item item xs={8} md={7}>
                    <ListItemText primary={value} />
                </Grid>
            </Grid>
        </ListItem>
        
    )

}))

export default DetailField