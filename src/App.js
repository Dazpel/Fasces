import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  auth,
  createUserProfileDocument,
} from './Components/firebase/firebase.utils';
import './App.css';
import LogIn from './Components/LogIn/LogIn';
import Groups from './Components/Groups/Groups';
import CreateGroup from './Components/Groups/CreateGroup';
import Navbar from './Components/navbar/Navbar';
import Topbar from './Components/navbar/Topbar';
import Chat from './Components/Chat/Chat';
import Receipt from './Components/ReceiptView/Receipt';
import Calculate from './Components/Algorithm/Calculate';
import ProfileView from './Components/Profile/ProfileView';
import AccountView from './Components/Profile/AccountView';
import GroupImage from './Components/groupImage/GroupImage';
import Trip from './Components/Trip/trip'
import NewHome from './Components/NewHome/NewHome'
import PastTrips from './Components/Profile/PastTrips'
import ContactUs from './Components/Profile/ContactUs'
import SendMail from './Components/sendEmail/SendMail'
import PastTrip from './Components/PastTrip/PastTrip'
import EndTrip from './Components/Trip/EndTrip';
import Expenses from './Components/Expenses/Expenses'

export default class App extends Component {
  state = {
    currentUser: {activeTrip: false},
    isData: false,
    onTrip: false,
  };

  //method to set session to null.
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    //Call auth method from Firebase to check whether or not we have an active session
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check if user logged in
      if (userAuth) {
        //If logged in, retrieve the data from user and set it to State
        const userRef = await createUserProfileDocument(userAuth);

       await userRef.onSnapshot((snapShot) => {
          let status = snapShot.data()
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
            isData: true,
            onTrip: status.activeTrip
          });
        });
      }
      //If logged out, clean state and set user to null
      else {
        this.setState({ currentUser: userAuth, isData: false });
      }
    });
  };

  //On log out clean session data and set it to null
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log('out')
    this.setState({
      currentUser: { activeTrip: false }
    })
  }
  /* END OF TRACKING USER STATUS*/
  /* START OF TRACK IF USER LOGGED IN OR NOT, PASS DOWN TO ALL COMPONENTS */

  render() {
    const { currentUser, isData, onTrip } = this.state;
    return (
      <div>
      {currentUser ? <Topbar/> : ('')}
        <Switch>

          <Route
            exact
            path="/chat/:id"
            component={(props) => (
              <Chat {...props} currentUser={this.state.currentUser} />
            )}
          />
         
          <Route
            exact
            path="/home/receipt"
            component={(props) => (<Receipt {...props} currentUser={this.state.currentUser} query={false}/>)}
          />
          <Route
            exact
            path="/pastTrip/receipt"
            component={(props) => (<Receipt {...props} currentUser={this.state.currentUser} query={true}/>)}
          />
          <Route
            exact
            path="/pastTrip/expenses"
            component={(props) => (<Expenses {...props} currentUser={this.state.currentUser}/>)}
          />
          <Route
            exact
            path="/home/pastTrip"
            component={(props) => <PastTrip {...props} currentUser={this.state.currentUser}/>}
          />
          <Route
            exact
            path="/home/endTrip"
            component={(props) => <EndTrip {...props} currentUser={this.state.currentUser}/>}
          />
          <Route
            exact
            path="/home/mail"
            component={(props) => <SendMail {...props} currentUser={this.state.currentUser}/>}
          />
          <Route
            exact
            path="/home/image"
            component={(props) => <GroupImage {...props} currentUser={this.state.currentUser} query={false}/>}
          />
          <Route
            exact
            path="/pastTrip/image"
            component={(props) => <GroupImage {...props} currentUser={this.state.currentUser} query={true}/>}
          />
          <Route
            path="/Calculate"
            component={(props) => (
              <Calculate {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/Profile"
            component={(props) => (
              <ProfileView {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/Account"
            component={(props) => (
              <AccountView {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/"
            component={(props) =>
              isData 
              ? (
                onTrip ?  <NewHome {...props} currentUser={currentUser}/> : <Trip {...props} currentUser={currentUser} /> 
              ) 
              : (
                <LogIn {...props} />
              )
            }
          />
          <Route
            exact
            path="/login"
            component={(props) => <LogIn {...props} />}
          />
          <Route
            exact
            path="/groups"
            component={(props) => (
              <Groups {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/creategroup"
            component={(props) => (
              <CreateGroup {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/PastTrips"
            component={(props) => (
              <PastTrips {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path="/ContactUs"
            component={(props) => (
              <ContactUs {...props} currentUser={this.state.currentUser} />
            )}
          />
        </Switch>
        {currentUser ? (currentUser.activeTrip ? <Navbar/> : ('')): ('')}
      </div>
    );
  }
}
