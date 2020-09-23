import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import HeaderProfileMenu from '../../components/widgets/HeaderProfileMenu';
import Routing from './routing';
import Sidebar from './Sidebar';
import useStyles from './styles';
import { getRoles } from '../../actions/userActions';
import clearStorage from '../../services/clearStorage';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
                HSST admin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Dashboard(props) {
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.userRole);
    const { roles } = userRole;
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [showProgress, setShowProgress] = useState(true);
    const [status, setStatus] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    //redirect back to login page if request is unauthorised
    useEffect(() => {
        if (status === 401) dispatch(logout(props.history));
    }, [status]);

    const logoutClicked = () => {
        clearStorage();
        dispatch(logout(props.history));
    };
    // TODO
    useEffect(() => {
        dispatch(getRoles(setShowProgress, setStatus));
    }, []);
    if (showProgress) return 'loading';
    else
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='absolute'
                    elevation={0}
                    className={clsx(
                        classes.appBar,
                        open && classes.appBarShift
                    )}
                    // style={{backgroundColor:"#1976d2"}}
                >
                    <Toolbar className={classes.toolbar}>
                        {/* <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton> */}
                        <Typography
                            component='h1'
                            variant='h6'
                            noWrap
                            className={classes.title}
                            style={
                                open
                                    ? { marginLeft: '20px' }
                                    : { marginLeft: '70px' }
                            }
                        >
                            HSST Admin
                        </Typography>
                        {/* <IconButton style={{color:"white"}}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
                        <HeaderProfileMenu logoutClicked={logoutClicked} />
                    </Toolbar>
                </AppBar>
                <Sidebar
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerOpen={handleDrawerOpen}
                    open={open}
                    roles={roles}
                />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='xl' className={classes.container}>
                        <Routing />
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
}
export default withRouter(Dashboard);
