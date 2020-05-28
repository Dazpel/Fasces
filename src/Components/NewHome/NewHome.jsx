import React, { Component } from 'react';
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

