import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
    Typography, 
    Grid,
    Button,
    Snackbar
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import ToDo from './ToDo'
import NewToDo from './NewToDo'
import { Alert } from '@material-ui/lab'


const useStyles = makeStyles((theme) => ({
  cardDetails: {
    marginTop: '15px'
  },
  addButton: {
      color: '#fb8500',
      marginLeft: '10px',
      fontSize: '0.7em'
  }
}))

const ToDos = inject('user')(observer((props) => {  
    
    const classes = useStyles()

    const [openNew, setOpenNew] = useState(false)

    const [alert, setAlert] = useState({add: false, delete: false})

    const { user, toDos, property } = props
    const handleOpenNewTask = () => {
        setOpenNew(true);
      }
    
    const handleClose = () => {
        setOpenNew(false);
    }

    const handleSubmitTodo = async function(todo) {
        await user.addNewTodo(property.id, todo)
        handleClose()
        setAlert({...alert, add: true})
    }

    const handleDelete = async function(taskId) {
        await user.deleteTodo(property.id, taskId)
        setAlert({...alert, delete: true})
    }

    return (
        <Fragment>
            <Grid item xs={12} container direction='row' >
               <Typography variant='h6'>
                    Open tasks 
                </Typography>
                <Button className={classes.addButton} onClick={handleOpenNewTask}>NEW TASK</Button> 
            </Grid>
            {toDos.map(t => <ToDo key={t.id} task={t} property={property} handleDelete={handleDelete}/>)}
            <NewToDo 
                open={openNew} 
                handleClose={handleClose}
                handleSubmitTodo={handleSubmitTodo}
                property={property}
            />
            <Snackbar open={alert.add} autoHideDuration={6000} onClose={() => setAlert({...alert, add: false})}>
                <Alert onClose={() => setAlert({...alert, add: false})} severity="info">
                    Task has been succssefully added to todo list!
                </Alert>
            </Snackbar>
            <Snackbar open={alert.delete} autoHideDuration={6000} onClose={() => setAlert({...alert, delete: false})}>
                <Alert onClose={() => setAlert({...alert, delete: false})} severity="info">
                    Task has been succssefully deleted from todo list
                </Alert>
            </Snackbar>
        </Fragment>
    )
}))

export default ToDos