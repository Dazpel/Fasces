import React, { Component } from 'react';
import { fetchTripData } from '../firebase/firebase.utils';
import Progress from '../progress/Progress';
import TripTable from './TripTable';

export default class PastTrip extends Component {
  state = {
    tripList: '',
    tripArr: '',
    userID: '',
    isData: false,
  };

  updateArr = async (tripList) => {
    this.setState({
      tripList: tripList,
      isData: true,
    });
  };

  componentDidMount() {
    this.updateArr(this.props.currentUser.trips);
  }

  render() {
    return this.props.currentUser && this.props.currentUser.trips ? (
      <TripTable props = {this.props} arr={this.props.currentUser.trips} userID={this.props.currentUser.id} />
    ) : (
      <Progress />
    );
  }
}
