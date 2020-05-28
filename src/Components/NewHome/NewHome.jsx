import React, { Component } from 'react';
<<<<<<< HEAD
import Chat from '../Chat/Chat';
import { Switch, Route } from 'react-router-dom';
import Receipt from '../ReceiptView/Receipt'
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import ProfileView from '../Profile/ProfileView';
import AccountView from '../Profile/AccountView';
import GroupImage from '../groupImage/GroupImage';
import Calculate from '../Algorithm/Calculate'

class NewHome extends Component {
    render() {

        const testFunc = () => {
            console.log(this.props.currentUser)
        }

        return (
          <div>
            
            <Chat
              currentUser={this.props.currentUser}
              chatID={this.props.currentUser.currentTrip}
            />
            

            {testFunc()}
          </div>
        );
    }
}

export default NewHome;

=======
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chat from '../Chat/Chat'

class NewHome extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="subtitle1" gutterBottom className="">
            we render chat here
          </Typography>
          <Chat />
        </Grid>
        <Navbar />
      </div>
    );
  }
}

export default NewHome;
>>>>>>> eb10af43643b6ac30dd82e59774c0a56ffc7d244
