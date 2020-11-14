import { IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  msg: {
    color: '#d00000'
  }
})

export default function ErrorNotice(props) {

  const classes = useStyles()

  return (
    <div className="error-notice">
      <Typography 
        variant='body2' 
        className={classes.msg}
        >
          {props.message}
          <IconButton onClick={props.clearError}>
            <CloseIcon />
          </IconButton>
      </Typography>
    </div>
  )
}