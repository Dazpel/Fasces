import React, { Component } from 'react';
import 'firebase/firestore';

class EndTripBalance extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default EndTripBalance;

export const tripBalance = (tripId) => {
    let x = []
    let trips = await tripList()
    let tripIndex = 0
    trips.map((ele, i) => {
        if (ele.id === tripId){tripIndex =  i}
    })
    let users = trips[tripIndex].data().users
    //let numOfUsers = users.length
    users.map(userId => {
        let user = await firestore.collection('users').doc(userId);
        let userData = await firestore.collection('users').doc(userId).get()
        let expense = userData.data().expenses
        x.push({ name:userData.name, balance:expense})
        try {
            user.update({
              expenses: total,
            });
          } catch (error) {
            console.log('Error adding stock', error);
          }
        return 0
    })
    let ustriper = await firestore.collection('trips').doc(tripId);
    try {
        trips.update({
            balance: x
        });
    } catch (error) {
        console.log('Error adding stock', error);
    }
}