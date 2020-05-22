import React, { Component } from 'react';
import Topbar from '../navbar/Topbar';
import Navbar from '../navbar/Navbar';
import { auth } from '../firebase/firebase.utils';

class ProfileView extends Component {
    render() {
        const logOut = () => {
            auth.signOut();
            this.props.history.push('/login');
          };
        return (
            <div>
            <Topbar/>
<br/>
<div className='App'>
  <img src={this.props.currentUser.photoURL} alt="John" style={{width: '50vw', borderRadius: '50%'}}/>
  <h1 style={{fontFamily: 'comic sans ms, cursive, sans-serif'}}>{this.props.currentUser.displayName}</h1>
  <hr/>
  <h3 style={{marginLeft: '5px', marginRight: '5px'}}>Email: {this.props.currentUser.email}</h3>
  <p style={{color: 'grey', fontSize: '18px'}}>(quote)</p>
  <p>Status: </p>
  <p><button onClick={logOut} style={{backgroundColor: 'red', color: 'white', borderRadius: '50%', width:'80px', height: '30px'}}>Log Out</button></p>
</div>

<Navbar/>
            </div>
        );
    }
}

export default ProfileView;