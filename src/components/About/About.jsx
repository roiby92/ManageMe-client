import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, {useEffect } from 'react'

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
    badge: {
        marginRight: '30px'
    },
    title: {
        marginBottom: '30px'
    }
}))

export default function About() {

    const classes = useStyles()

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
      
        const about = document.getElementById('about')
        about.appendChild(script);
      
        return () => {
            about.removeChild(script);
        }
    }, []);

    return (
        <Grid
            item
            xs={12}
            className={classes.container}
            id='about'
            container
        >
            <Typography variant='h5' className={classes.title}>
                About Us
            </Typography>
            <Grid
                item
                xs={12}
                className={classes.container}
                id='about'
                container
                direction='row'
            >
                <div 
                    className={`${classes.badge} LI-profile-badge`}  
                    data-version="v1" 
                    data-size="medium" 
                    data-locale="en_US" 
                    data-type="vertical" 
                    data-theme="light" 
                    data-vanity="idan-shalem-3a1781169"
                >
                    <a class="LI-simple-link" href='https://il.linkedin.com/in/idan-shalem-3a1781169?trk=profile-badge'>
                        Idan Shalem
                    </a>
                </div>
                <div 
                    className={`${classes.badge} LI-profile-badge`}   
                    data-version="v1" 
                    data-size="medium" 
                    data-locale="en_US" 
                    data-type="vertical" 
                    data-theme="light" 
                    data-vanity="dani-sofer"
                >
                    <a 
                        class="LI-simple-link" 
                        href='https://il.linkedin.com/in/dani-sofer?trk=profile-badge'
                    >
                        Dani Sofer
                    </a>
                </div>
                <div 
                    className={`${classes.badge} LI-profile-badge`}  
                    data-version="v1" 
                    data-size="medium" 
                    data-locale="en_US" 
                    data-type="vertical" 
                    data-theme="light" 
                    data-vanity="roi-ben-ishai-9a5125199"
                >
                    <a 
                        class="LI-simple-link" 
                        href='https://il.linkedin.com/in/roi-ben-ishai-9a5125199?trk=profile-badge'
                    >
                        Roi Ben Ishai
                    </a>
                </div>
                <div 
                    className={`${classes.badge} LI-profile-badge`}  
                    data-version="v1" 
                    data-size="medium" 
                    data-locale="en_US" 
                    data-type="vertical" 
                    data-theme="light" 
                    data-vanity="yuval-lotem-3915901b7"
                >
                    <a 
                        class="LI-simple-link" 
                        href='https://il.linkedin.com/in/yuval-lotem-3915901b7?trk=profile-badge'
                    >
                        Yuval Lotem
                    </a>
                </div>
            </Grid>
        </Grid>
    )

}