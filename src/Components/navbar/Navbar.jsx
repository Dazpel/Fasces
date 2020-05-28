import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Toolbar from '@material-ui/core/Toolbar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import HomeIcon from '@material-ui/icons/Home'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MoneyIcon from '@material-ui/icons/AttachMoney'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ChatIcon from '@material-ui/icons/Chat'
import { Link } from 'react-router-dom'
 

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));

  export default function BottomAppBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    return (
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className={classes.grow}
            style={{ backgroundColor: "inherit" }}
          >
            <BottomNavigationAction
              style={{ color: "#0095ff" }}
              label="Chat"
              icon={
                <Link to="/" style={{ color: "#0095ff" }}>
                  <ChatIcon />
                </Link>
              }
            />
            <BottomNavigationAction
              style={{ color: "#0095ff" }}
              label="Payments"
              icon={
                <Link to="/Calculate" style={{ color: "#0095ff" }}>
                  <MoneyIcon />
                </Link>
              }
            />
            <BottomNavigationAction
              style={{ color: "#0095ff" }}
              label="Images"
              icon={
                <Link to="/home/image" style={{ color: "#0095ff" }}>
                  <PhotoLibraryIcon />
                </Link>
              }
            />
            <BottomNavigationAction
              style={{ color: "#0095ff" }}
              label="Receipts"
              icon={
                <Link to="/home/receipt" style={{ color: "#0095ff" }}>
                  <ReceiptIcon />
                </Link>
              }
            />
          </BottomNavigation>
        </Toolbar>
      </AppBar>
    );
}