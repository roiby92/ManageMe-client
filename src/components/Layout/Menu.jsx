import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Avatar
} from '@material-ui/core'
import {
  Home as HomeIcon,
  Event as EventIcon,
  Menu as MenuIcon,
  TrendingUp as TrendingUpIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  Chat,
  Info as InfoIcon
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import logo from '../../HatchfulExport-All/logo_transparent_white.png'
import BookIcon from '@material-ui/icons/Book';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    height: '45px',
    [theme.breakpoints.up('md')]: {
      height: '60px',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#023047'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBarContainer: {
    marginBottom: '60px'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  mainAppBar: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    alignItems: 'center',
    width: '100%'
  },
  welcoming: {
    fontFamily: "'Montserrat', sans-serif",
    justifySelf: 'end',
    alignSelf: 'end'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}))

const Menu = inject('user')(observer((props) => {

  const { window, handleLogout, user } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <Link to='/home/profile'
          onClick={() => localStorage.setItem('currentRoute', '/home/profile')}
          className={classes.link}>
          <ListItem button key='img'>
            <ListItemIcon>
              <Avatar
                alt="user-avatar"
                src={user.img}
                className={classes.small}
              />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>
        <Link to='/home/properties'
          onClick={() => localStorage.setItem('currentRoute', '/home/properties')}
          className={classes.link}>
          <ListItem button key='Home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link to='/home/calendar'
          onClick={() => localStorage.setItem('currentRoute', '/home/calendar')}
          className={classes.link}>
          <ListItem button key='Calendar'>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary='Calendar' />
          </ListItem>
        </Link>
            {user.type.id === 1
              ?
              <Fragment>
                <Link to='/home/serviceproviders'
                  onClick={() => localStorage.setItem('currentRoute', '/home/serviceproviders')}
                  className={classes.link}>
                      <ListItem button key='Service-Providers'>
                          <ListItemIcon>
                              <GroupIcon />
                          </ListItemIcon>
                          <ListItemText primary='Service Providers'/>
                      </ListItem>
                  </Link>
                <Link to='/home/charts'
                  onClick={() => localStorage.setItem('currentRoute', '/home/serviceproviders')}
                  className={classes.link}>
                      <ListItem button key='Analytics'>
                          <ListItemIcon>
                              <TrendingUpIcon />
                          </ListItemIcon>
                          <ListItemText primary='Analytics'/>
                      </ListItem>
                  </Link>

              </Fragment>
              : <Fragment>
               <Link to='/home/todos'
                 onClick={() => localStorage.setItem('currentRoute', '/home/allTodos')}
                 className={classes.link}>
                     <ListItem button key='My Todo'>
                         <ListItemIcon>
                             <BookIcon />
                         </ListItemIcon>
                         <ListItemText primary='My Todo'/>
                     </ListItem>
                 </Link>
             </Fragment>
            }
        <Link to='/home/chat'
          onClick={() => localStorage.setItem('currentRoute', '/home/chat')}
          className={classes.link}>
          <ListItem button key='Chat'>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary='Chat' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to='/home/settings'
            onClick={() => localStorage.setItem('currentRoute', '/home/settings')}
            className={classes.link}>
                <ListItem button key='Settings'>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Settings'/>
                </ListItem>
          </Link>
          <Link to='/home/aboutus'
            onClick={() => localStorage.setItem('currentRoute', '/home/aboutus')}
            className={classes.link}>
                <ListItem button key='About'>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='About Us'/>
                </ListItem>
          </Link>
            <ListItem button key={'Log Out'} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
            </ListItem>
        </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid className={classes.appBarContainer} container>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.tool}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.mainAppBar}>
              <img src={logo} className={classes.logo} />
              <Typography variant="h6" noWrap className={classes.welcoming}>
                {`Welcome, ${user.firstName}`}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}))

Menu.propTypes = {
  window: PropTypes.func,
}

export default Menu