import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Fragment } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles((theme) => ({
    serviceProviderCard: {
        backgroundColor: '#8ecae6'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    deleteButton: {
        backgroundColor: '#ffb703'
    },
    titlesContainer: {
        marginTop: '10px',
        marginBottom: '5px'
    },
    tableCell: {
        marginBottom: '5px'
    }
}))
const ServiceProvidersRow = inject('user')(observer((props) => {  

    const { user, serviceProvider, rowType } = props

    const classes = useStyles()

    const handleDelete = async () => {
        return props.handleDelete(serviceProvider.id)
    }

    return (
        <Fragment>
            {rowType === 0
                ?    <Accordion className={classes.serviceProviderCard}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography 
                                className={classes.heading}
                            >
                                {serviceProvider.firstName} {serviceProvider.lastName} - {serviceProvider.type.type}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item xs={12} container direction='column'>
                                <Typography variant="subtitle2">
                                    EMAIL: {serviceProvider.email}
                                </Typography>
                                <Typography variant="subtitle2">
                                    PHONE: {serviceProvider.phone}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    className={classes.deleteButton} 
                                    onClick={handleDelete}
                                >
                                    DELETE
                                </Button>
                            </Grid>
                            
                        </AccordionDetails>
                    </Accordion> 
                :   <Grid 
                        item 
                        xs={12} 
                        container 
                        direction='row' 
                        className={classes.tableCell}
                        alignItems='center'
                    >
                        <Grid item xs={1}>
                            <IconButton >
                                <DeleteIcon onClick={handleDelete} id={serviceProvider.id} />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {serviceProvider.firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {serviceProvider.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {serviceProvider.type.type}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant='body1'>
                                {serviceProvider.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {serviceProvider.phone}
                            </Typography>
                        </Grid>
                    </Grid> 
            } 
        </Fragment>

    )
}))

export default ServiceProvidersRow