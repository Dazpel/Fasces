import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { endTripStatus } from '../firebase/firebase.utils'

class AccountView extends Component {

  render() {

    //Function for clicking OK on End Trip
    const alert = () => {
      if (window.confirm("Do you really want to leave?")) { 
        endTripStatus(this.props.currentUser.id)
        this.props.history.push('/')
      }
    }

    return (
      <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block" }}>
        <br />
        <List
          component="nav"
          style={{width: "100vw", maxWidth: 360}}
          aria-label="mailbox folders"
        >
          <Link
            to="/Profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            to="/home/pastTrip"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary="Past Trips" />
            </ListItem>
          </Link>
          <Divider light />
          <Link
            to="/ContactUs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </Link>
          {this.props.currentUser.activeTrip ? (
            <>
              <Divider light />
              <ListItem button divider style={{color: 'red'}}>
                <ListItemText primary="End Trip" onClick={alert}/>
              </ListItem>
            </>
          ) : (
            ""
          )}
        </List>
      </div>
    </div>
    );
  }
}

export default AccountView;