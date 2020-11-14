import { Grid, makeStyles, Typography, MenuItem, TextField, Button, Card, Paper, Avatar } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import moment from 'moment'
const ENDPOINT = "http://localhost:3001";


const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '1000%',
        height: '100%',
        [theme.breakpoints.up('md')]: {
          marginLeft: 40,
          maxWidth: '100%',
          height: 550
        },
        [theme.breakpoints.up('xl')]: {
            marginLeft: 40,
            maxWidth: '100%',
            height: 700
        }
    },
    cardMessage: {
        maxHeight: '100%',
        padding: '10px',
        height: '100%'
    },
    messages: {
        [theme.breakpoints.up('md')]: {
            height: 450,      
        },
        [theme.breakpoints.up('xl')]: {
            height: 600,      
        },
        padding: '10px',
        overflowY:'scroll'
    },
    writeMessage: {
        marginTop: '20px'
    },
    sendButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#023047',
        color: 'white'
    },
    msg: {
        display: 'inline-block',
        padding: '10px',
        borderRadius: '3px',
        boxShadow: '1px 1px 3px #b9b9b9',
        marginTop: '10px'
    },
    User: {
         backgroundColor: '#8ecae6',
    },
    Else: {
        backgroundColor: '#ffb703'
    },
    date: {
        fontSize: '0.55rem',
        color: '#505050'
    }
}))

const Chat = inject('user')(observer((props) => {
    const { user } = props
    const classes = useStyles()
    const [msg, setMsg] = useState({
        text: '',
        sender: user.id,
        getter: '',
        date: Date.now()
    })

    const socket = socketIOClient(ENDPOINT);
    useEffect(() => {
        socket.on('send', function (msg) {
            if(msg.getter === user.id){
                user.addNewMessage(msg.sender, msg)
            }
        })
        const elem = document.getElementById('messagnger')
        elem.scrollTop = elem.scrollHeight;
    })

    const handleSend = async () => {
        await socket.emit('send', msg)
        await user.addNewMessage(msg.getter, msg)
        await setMsg({...msg, text: ''})
        const elem = document.getElementById('messagnger')
        elem.scrollTop = elem.scrollHeight;
    }

    return (
        <Grid
            item
            xs={12}
            className={classes.container}
        >
            <Grid item xs={12}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Servicer From List"
                    name='type'
                    onChange={(e)=> setMsg({...msg, getter: e.target.value})}
                    fullWidth
                    SelectProps={{
                        MenuProps: {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }
                    }}>
                        {user.serviceWorkers.map(s => (
                            <MenuItem id={s.id} value={s.id}>
                                {s.firstName + " " + s.lastName}
                            </MenuItem>
                        ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Card className={classes.cardMessage}>
                    <Paper className={classes.messages} id='messagnger'>
                        {msg.getter &&
                            user.serviceWorkers
                                .find(s => s.id === msg.getter)
                                .messages
                                    .map(m =>
                                        <Grid 
                                            item 
                                            xs={12} 
                                            container 
                                            justify= {m.sender !== user.id && 'flex-end' }
                                        >
                                                <div
                                                    className={`${classes.msg}
                                                        ${m.sender === user.id 
                                                            ? classes.User 
                                                            : classes.Else}
                                                        `}
                                                >
                                                    {m.text} <span className={classes.date}>{moment(m.date).format("DD/MM/YY h:mm")}</span>
                                                </div>
                                        </Grid>
                                    )
                        }
                    </Paper>
                    <Grid item xs={12} container justify='center' className={classes.writeMessage}>
                            <Grid item xs={10}>
                                <TextField
                                    id='outlined-multiline-static'
                                    variant='outlined'
                                    autoFocus
                                    variant="outlined"
                                    name="text"
                                    label="Write a message..."
                                    type="text"
                                    value={msg.text}
                                    fullWidth
                                    onChange={(e)=> setMsg({...msg, text: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    onClick={handleSend} 
                                    variant='contained'
                                    className={classes.sendButton}
                                >
                                    Send
                                </Button>
                            </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid >
    )
}))
export default Chat