import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';
import Navbar from '../navbar/Navbar'
import {Link } from 'react-router-dom';
import axios from 'axios';

let MY_URL_KEY = '31bb9650994211eab7efc1191d38e165';

export default class Home extends Component {
  getReceiptData = () => {

    let file = {
      url: 'https://edge.taggun.io/web/receipt4.png',
      headers: {
        'x-custom-key': 'string',
      },
    };

    axios
      .post('https://api.taggun.io/api/receipt/v1/simple/url', file, {
        headers: {
            'apikey': MY_URL_KEY,
        }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  goToChat = () => {
    console.log('run')
    this.props.history.push('/chat');
  }

  render() {
    // console.log(this.props.currentUser);
    //LOG OUT FUNCTION HANDLER
    const logOut = () => {
      auth.signOut();
      this.props.history.push('/login');
    };

    return (
      <div>
        Home page, it means we are log in.
        <div>
          <button onClick={logOut}>Log Out</button>
          <button onClick={this.getReceiptData}>test receipt</button>
          <button onClick={this.goToChat}>go to chat</button>
        </div>
      </div>
    );
  }
}
