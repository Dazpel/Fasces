import React, { Component } from 'react';
import actions from '../../RouteContainer/axiosCalls';

export default class SendMail extends Component {
  sendEmail = async () => {

    let emailArr = ['alexxdav97@gmail.com','andarus97@gmail.com']

    await actions
      .triggerEmail(emailArr)
      .then((response) => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        console.log(response);
        
      })
      .catch((err) => {
        console.log('Error while sending emails: ', err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.sendEmail} >send mail</button>
      </div>
    );
  }
}
