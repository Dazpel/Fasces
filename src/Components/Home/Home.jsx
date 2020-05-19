import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';
import Navbar from '../navbar/Navbar'


export default class Home extends Component {
  
  render() {
    console.log(this.props.currentUser)
    //LOG OUT FUNCTION HANDLER
    const logOut = () => {
      auth.signOut();
      this.props.history.push('/login');
    };

    return <div>
        <div>
            <button  onClick={logOut}>Log Out</button>
        </div>
        <h1>
            HOME PAGE
        </h1>
    </div>;
  }
}
