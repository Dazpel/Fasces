import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  auth,
  createUserProfileDocument,
} from './Components/firebase/firebase.utils';
import Home from './Components/Home/Home';
import './App.css';
import LogIn from './Components/LogIn/LogIn';
import Navbar from './Components/navbar/Navbar'

export default class App extends Component {
  state = {
    currentUser: '',
    isData: false,
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

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
            isData: true,
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
  }
  /* END OF TRACKING USER STATUS*/
  /* START OF TRACK IF USER LOGGED IN OR NOT, PASS DOWN TO ALL COMPONENTS */

  render() {
    const { currentUser, isData } = this.state;
    return (
      <div >
        <Switch>
          <Route
            path="/"
            component={(props) =>
              isData ? (
                <Home {...props} currentUser={currentUser} />
              ) : (
                <LogIn {...props} />
              )
            }
          />
          <Route
            exact
            path="/login"
            component={(props) => <LogIn {...props} />}
          />
        </Switch>
        <Navbar/>
      </div>
    );
  }
}
