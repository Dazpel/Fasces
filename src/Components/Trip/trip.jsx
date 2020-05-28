import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Topbar from '../navbar/Topbar';
import NewTrip from './newTrip';
<<<<<<< HEAD
import './trip.css'
=======
import JoinTrip from './JoinTrip.jsx';
>>>>>>> eb10af43643b6ac30dd82e59774c0a56ffc7d244

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
      <div className="gradientHome">
      <div className="tripContainer" >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="tripContainer-header"
        >
<<<<<<< HEAD
          <Typography variant="subtitle1" gutterBottom className="" style={{color: 'white', textAlign: 'center'}}>
            <h2>Welcome, {this.props.currentUser.displayName}, click New trip if you want to
            create a new trip with friends, or if you already have a group,
            click Join trip.</h2>
=======
          <Typography variant="subtitle1" gutterBottom className="">
            Welcome, {`{user}`}, click New trip if you want to
            create a new trip with friends, or if you already have a group,
            click Join trip.
>>>>>>> eb10af43643b6ac30dd82e59774c0a56ffc7d244
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
<<<<<<< HEAD
   
          <Button
            style ={{backgroundColor:'#2769a7', color: "white"}}
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            // onClick={() => this.handleSubmit(this.state.imageUrl)}
          >
            Join trip
          </Button>
=======
         <JoinTrip user={this.props.currentUser}/>
>>>>>>> eb10af43643b6ac30dd82e59774c0a56ffc7d244
        </Grid>
        </div>
      </div>
    );
  }
}
