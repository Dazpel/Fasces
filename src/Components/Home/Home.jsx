import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';




export default class Home extends Component {


  goToGroups = () => {
    console.log('run')
    this.props.history.push('/groups');
  }

  printGroups = () => {
    return this.props.currentUser.trackStock.map(ele => {
      return (
        <div>
          <Link to={`/chat/${ele}`} >go to chat {ele}</Link>
        </div>
      )
    })
  }

  

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
    const goToImage = () => {
      this.props.history.push('/home/image');
    }

    return (
      <div>
      <Topbar logOut={this.logOut}/>
        Home page, it means we are log in.
        <div>
          <button onClick={logOut}>Log Out</button>
          <button onClick={this.goToGroups}>go to groups</button>
          <button onClick={goToReceipt}>go to receipt</button>
          <button onClick={goToChat}>go to chat</button>
          <button onClick={goToImage}>check img</button>
          {this.printGroups()}
        </div>
        <Navbar/>
      </div>
    );
  }
}
