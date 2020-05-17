import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';


export default class Home extends Component {
  
  render() {
    console.log(this.props.currentUser)
    //LOG OUT FUNCTION HANDLER
    const logOut = () => {
      auth.signOut();
      this.props.history.push('/login');
    };

    return <div>Home page, it means we are log in.
        <div>
            <button  onClick={logOut}>Log Out</button>
        </div>
    </div>;
  }
}
