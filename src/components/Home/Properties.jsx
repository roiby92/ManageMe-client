import React, { useState, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import PropertyCard from './propertyCard'
import PropertyDetails from './PropertyDetails/PropertyDetails'
import AddButton from './AddProperty/AddButton'
import AddProperty from './AddProperty/AddProperty'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    properties: {
        display: 'grid',
        gridTemplateColumns: '1fr',   
        gridGap: '20px',
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3,1fr)',
        },
    }
}))

const Properties = inject('user')(observer((props) => {

    const classes = useStyles()

    const { user, match } = props
    const { propertyId } = match.params

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true)
    }

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false)
    }
    
    return (
        <Fragment>
            {
                propertyId
                    ? <PropertyDetails propertyId={propertyId} />
                    :   <Grid
                            item
                            xs={12}
                            className={classes.properties}
                            container
                        >
                            {user.properties.map(p => 
                                <PropertyCard key={p.id} property={p} />
                            )}
                        </Grid>
            }
            {user.type.id === 1 ?
            <AddButton label={"Add Property"} handleOpenAddDialog={handleOpenAddDialog} />
            : null }
            <AddProperty
                open={addDialogOpen}
                handleCloseAddDialog={handleCloseAddDialog}
            />
        </Fragment>
    )
}))

export default Properties