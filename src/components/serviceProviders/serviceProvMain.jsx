import { Grid, makeStyles, MenuItem, Typography, TextField } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import AllServiceProv from './allServiceProv';
import AddButton from '../Home/AddProperty/AddButton'
import UpdateServicer from './AddServicer'

const useStyles = makeStyles((theme) => ({
    serviceContainer: {
        marginBottom: '30px',
        [theme.breakpoints.up('md')]: {
            marginLeft: 40,
        },
    },
    title: {
        marginBottom: '10px'
    },
    searchingContainer: {
        marginBottom: '20px'
    },
    textField: {
        marginRight: '25px'
    }
}))


const ServiceProvMain = inject('user')(observer((props) => {

    const { user } = props
    const classes = useStyles()
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [value, setValue] = useState('')
    const [key, setKey] = useState('')
    const [filterEmployee, setFilterEmployee] = useState([...user.serviceWorkers])
    const handleOpenAddDialog = () => {
        setAddDialogOpen(true)
    }
    const handleCloseAddDialog = () => {
        setAddDialogOpen(false)
    }

    const handleType = e => {
        setValue(e.target.value)
        if(e.target.value){
        setFilterEmployee(user.serviceWorkers.filter(s => s[key].includes(e.target.value)))
        }else{
            setFilterEmployee([...user.serviceWorkers])
        }
    }

    return (

        <Grid item
            xs={12}
            container
            className={classes.serviceContainer}
        >
            <Typography variant='h5' className={classes.title}>
                All properties Schedule
            </Typography>
            <Grid item xs={12} container direction='row' className={classes.searchingContainer}>
                <Grid item xs={3} className={classes.textField}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        value={value}
                        onChange={handleType}
                        label={`Seacrh By ${key}`}
                        disabled={!key}
                    />
                    <datalist id="standard-basic">
                        {filterEmployee.map(e=> <option key={e.id} value={e[key]} /> )}
                    </datalist>
                </Grid>
                <Grid item xs={2} className={classes.textField}>
                    <TextField
                        className={classes.dropDown}
                        select
                        fullWidth
                        label='Search Field'
                        id="demo-simple-select"
                        onChange={(e) => { setKey(e.target.value) }}
                        value={key}
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
                            <MenuItem value='firstName'>Name</MenuItem >
                            <MenuItem value='email'>Email</MenuItem >
                    </TextField>
                </Grid>
            </Grid>

            <AllServiceProv filterEmployee={filterEmployee}/>
            <AddButton label={"Add Servicer"} handleOpenAddDialog={handleOpenAddDialog} />
            <UpdateServicer
                open={addDialogOpen}
                handleCloseAddDialog={handleCloseAddDialog}
            />
        </Grid>
    )
}))

export default ServiceProvMain