import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import ChatIcon from '@material-ui/icons/QuestionAnswer'
import { Link } from 'react-router-dom'
import GroupSearch from '../Groups/Groups'





export default class Home extends Component {
  goToGroups = () => {
    console.log('run');
    this.props.history.push('/groups');
  };

  printGroups = () => {
    console.log('running')
    return this.props.currentUser.trackStock.map((ele) => {
      return (
        <Link to={`/chat/${ele}`} style={{color:'white', textDecoration: 'none'}}><div style={{color:'white', backgroundColor: '#0095ff'}}>
          <ChatIcon/> {ele}
          <hr style={{borderColor: 'white'}}/>
        </div></Link>
      )
    })
  }

  

  render() {
    
    const goToChat = () => {
      this.props.history.push('/home/chat');
    };
    const goToImage = () => {
      this.props.history.push('/home/image');
    };
    const goToReceipt = () => {
      this.props.history.push('/home/receipt');
    };

    return (
      <div>
      <Topbar/>
        <div>
        {/* <h1 style={{textAlign:'center', color: '#0095ff', textShadow: '2px 2px #b5bbbd'}}>Welcome, {this.props.currentUser.displayName}</h1> */}
        <div style={{marginLeft:'10px', marginRight: '10px'}}>
        <Link to='/creategroup' style={{color:"#0095ff"}} ><h5 style={{textAlign: 'end',marginBottom:'0', marginTop: '3px'}}>Start a group</h5></Link>
          <h2 style={{marginTop: '0', color:"#0095ff", marginBottom:'0'}}>Groups</h2>
          <GroupSearch currentUser={this.props.currentUser}/>
        </div>
        </div>
        <div style={{marginLeft:'10px', marginRight: '10px'}}>        
          <hr style={{borderColor: 'white', marginBottom: '0'}}/>
          {this.printGroups()}
        </div>
        <Navbar/>
      </div>
    );
  }
}
