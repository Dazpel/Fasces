import React, { Component } from 'react';
import Topbar from '../navbar/Topbar';
import Navbar from '../navbar/Navbar'

class ProfileView extends Component {
    render() {
        return (
            <div>
            <Topbar/>
<br/>
<div class='App'>
  <img src="https://www.winchcombe.co.uk/wp-content/uploads/2017/04/male-silhouette.png" alt="John" style={{width: '50vw', borderRadius: '50%'}}/>
  <h1>John Doe</h1>
  <hr/>
  <p style={{color: 'grey', fontSize: '18px'}}>(quote)</p>
  <p>Status: </p>
  <p><button style={{backgroundColor: 'red', color: 'white', borderRadius: '50%', width:'80px', height: '30px'}}>Log Out</button></p>
</div>

<Navbar/>
            </div>
        );
    }
}

export default ProfileView;