import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';
import Navbar from '../navbar/Navbar'
import {Link } from 'react-router-dom';




export default class Home extends Component {
  

  render() {
    // console.log(this.props.currentUser);
    //LOG OUT FUNCTION HANDLER
    const logOut = () => {
      auth.signOut();
      this.props.history.push('/login');
    };
    const goToReceipt = () => {
      
      this.props.history.push('/home/receipt');
    };
    const goToChat = () => {
      this.props.history.push('/home/chat');
    }

    return (
      <div>
        Home page, it means we are log in.
        <div>
          <button onClick={logOut}>Log Out</button>
          <button onClick={goToReceipt}>go to receipt</button>
          <button onClick={goToChat}>go to chat</button>
        </div>
      </div>
    );
  }
}
