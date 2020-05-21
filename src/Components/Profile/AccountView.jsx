import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Topbar from '../navbar/Topbar';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
      <>
      <Topbar/>
      <br/>
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <Link to='/Profile' style={{textDecoration: 'none', color: 'inherit'}}><ListItem button>
        <ListItemText primary="Profile" />
      </ListItem></Link>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Upload Photos" />
      </ListItem>
      <Link to='/chat' style={{textDecoration: 'none', color: 'inherit'}}><ListItem button>
        <ListItemText primary="Chats" />
      </ListItem></Link>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Contact Us" />
      </ListItem>
    </List>
   <Navbar/> 
   </>
  );
}