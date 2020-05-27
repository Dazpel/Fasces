import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Topbar from '../navbar/Topbar';
import NewTrip from './newTrip';
import JoinTrip from './JoinTrip.jsx';

export default class Trip extends Component {
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
      <div className="tripContainer">
        <Topbar />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="tripContainer-header"
        >
          <Typography variant="subtitle1" gutterBottom className="">
            Welcome, {`{user}`}, click New trip if you want to
            create a new trip with friends, or if you already have a group,
            click Join trip.
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          className="tripContainer-btns"
        >
         <NewTrip  user={this.props.currentUser}/>
         <JoinTrip user={this.props.currentUser}/>
        </Grid>
      </div>
    );
  }
}
