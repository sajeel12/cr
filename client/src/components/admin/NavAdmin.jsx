import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArchiveIcon from '@mui/icons-material/Archive';
import CloudIcon from '@mui/icons-material/Cloud';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


import MailIcon from '@mui/icons-material/Mail';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

import BodyClient from './BodyAdmin'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../auth/Logout';
import BodyAgent from './BodyAgent'



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  // backgroundColor: '#33333',
  backgroundColor: 'black',

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'black',

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black',

  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,

  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);





function NavAdmin({ username, isadmin }) {
  //  const  propTypes = {
  //   logout: PropTypes.func.isRequired
  //  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" style={{ color: 'white', backgroundColor: 'black' }} open={open}>
        <Toolbar    >
          <IconButton

            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: '#43bc68',
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >

            <MenuIcon sx={{color:'#43bc68'}}  />
          </IconButton>
          <div style={{display:'flex', justifyContent:'space-between'}} >
            <Typography variant="h6" noWrap component="div">
              Digital Solution Hub      {isadmin ? '--------- Admin' : ''}
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: 50, color: 'white', }} >
              {username}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton sx={{color:'#43bc68'}}  onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/*=======================List=====================  */}
        <List >

          {isadmin ?
            <>


              <Link to='/' style={{ textDecoration: 'none', color: '#707070' }} >
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <LeaderboardIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Lead"} sx={{ opacity: open ? 1 : 0  }} />
                  </ListItemButton>
                </ListItem>
              </Link>


              <Link to='/agents' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <SupportAgentIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Agents"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>




              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                // onClick={}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <LogoutIcon sx={{ color: 'red' }} />
                  </ListItemIcon>
                  {/* <Logout/> */}
                  <ListItemText primary={<Logout />} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </>


            :

            <>

              <Link to='/' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <LeaderboardIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Lead"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/followup' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <FollowTheSignsIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Follow Up"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/quotes' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <FormatQuoteIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Quotes"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/orders' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <BookOnlineIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Orders"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/dispatched' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <LocalShippingIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Dispatched"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/archived' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <ArchiveIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Archived"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to='/potential' style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <CloudIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Potential"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to="/customer_agreement" style={{ textDecoration: 'none', color: '#707070' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      <NoteAltIcon sx={{ color: '#43bc68' }} />
                    </ListItemIcon>
                    <ListItemText primary={"Customer's Agreement"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                // onClick={}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <LogoutIcon sx={{ color: 'red' }} />
                  </ListItemIcon>
                  {/* <Logout/> */}
                  <ListItemText primary={<Logout />} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>



            </>
          }





          {/* ------------------------List------------------------------------------- */}
        </List>
        <Divider />

      </Drawer>


    </>
  );
}

export default connect()(NavAdmin);