import React, { Component } from 'react';
import Chat from '../Chat/Chat';

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

