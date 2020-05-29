import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NewTrip from './newTrip';
import './trip.css'
import JoinTrip from './JoinTrip.jsx';

export default class Trip extends Component {
  render() {

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
          <Typography variant="subtitle1" gutterBottom className="" style={{color: 'white', textAlign: 'center'}}>
            <h2>Welcome, {this.props.currentUser.displayName}, click New trip if you want to
            create a new trip with friends, or if you already have a group,
            click Join trip.</h2>
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
   
          {/* <Button
            style ={{backgroundColor:'#2769a7', color: "white"}}
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            // onClick={() => this.handleSubmit(this.state.imageUrl)}
          >
            Join trip
          </Button> */}
         <JoinTrip user={this.props.currentUser}/>
        </Grid>
        </div>
      </div>
    );
  }
}
