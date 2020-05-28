import React, { Component } from 'react';
import {tripList, updateExpenses} from '../firebase/firebase.utils'

export const calculateTotal = async (x, tripId, currentUser) => {
    //add total to users expenses
    //removal the total / # of users from everyone in the group, rounded by 2
    //the person paying spends the extra cent in the case of awkward division
    let trips = await tripList()
    let tripIndex = 0
    trips.map((ele, i) => {
        if (ele.id === tripId){tripIndex =  i}
    })
    console.log(trips[tripIndex].data())
    let users = trips[tripIndex].data().users
    let numOfUsers = users.length
    let value = Number((x/numOfUsers).toFixed(2))*-1
    users.map(user => {
        //currentUser.id
        if((currentUser.id ? currentUser.id : 'rFEdDIXvFjSpjvIMpAm8GhHxJl72') === user)
        {
            updateExpenses(user, value - value*numOfUsers)
        }
        else 
            updateExpenses(user, value)
        
    })
}

// class receiptAlgorithm extends Component {
//     render() {
//         return (
//             <div>
//                 Totals updated
//             </div>
//         );
//     }
// }




