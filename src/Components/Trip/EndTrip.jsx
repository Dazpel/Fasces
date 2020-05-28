import React, { Component } from 'react';
import { endTrip } from '../firebase/firebase.utils';
import actions from '../../RouteContainer/axiosCalls'

export default class EndTrip extends Component {
  render() {
    const closeAndMigrateTrip = async (userID, tripID) => {
        let email = []
      try {
        email = await endTrip(userID, tripID);
        
      } catch (err) {
        console.log(err);
      }

      if (email.length > 0) {
          actions.triggerEmail(email)
      }

    };

    return (
      <div>
        <button
          onClick={() =>
            closeAndMigrateTrip(
              this.props.currentUser.id,
              this.props.currentUser.currentTrip
            )
          }
        >
          Close all groups!
        </button>
      </div>
    );
  }
}
