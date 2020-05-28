import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import './PastTrips.css'
import React, { Component } from 'react';


class PastTrips extends Component {

  state = {
    trips: []
  }

//   async componentDidMount(){
//     let res = await // ?? Get info from database
//     this.setState({
//         trips: 'info'
//     })
// }

// Map through trips to display trip cards
  showTrips = () => {
    return this.state.trips.map((trip)=> {
      return (
        <div style={{overflow: 'scroll', height: '85vh'}}>
        <div className='base' style={{textAlign: 'center'}} >
        <br/>
          <Paper className='paper' style={{backgroundColor: 'aliceblue', maxWidth: 300}}>
            <Grid container spacing={2}>
              <Grid item>
                  <Link to='/TripImage'><img style={{width: '100vw'}} className='img' alt="complex" src={trip.image} /></Link>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {trip.tripName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {trip.date}
                    </Typography>
                    <Typography variant="subtitle1">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginRight: '10px'}}>What you owe: {trip.tripExpense}</div>
                    <button className="moneyButton" >PAY $</button>
                    </div>
                    </Typography>
                    <Typography>
                      Who to pay:
                    </Typography>
                    {this.props.currentUser ? <Typography>
                      (People you owe)
                    </Typography>: <Typography>You're all set!</Typography>}
                    <button className='button'>Receipts</button> | <button className='button'>Images</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        </div>
      )
    })
  }

  render() {

    let tripName = 'PLANET YODA';
    let date = 'July 10, 2020'
    let tripExpense = '$101.99'
    let image= 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'

    return (
        <>
        {this.showTrips()}


        {/* Example Trip Card ---> */}
        <div style={{overflow: 'scroll', height: '85vh'}}>
        <div className='base' style={{textAlign: 'center'}} >
        <br/>
          <Paper className='paper' style={{backgroundColor: 'aliceblue', maxWidth: 300}}>
            <Grid container spacing={2}>
              <Grid item>
                  <Link to='/TripImage'><img style={{width: '100vw'}} className='img' alt="complex" src={image} /></Link>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {tripName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {date}
                    </Typography>
                    <Typography variant="subtitle1">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginRight: '10px'}}>What you owe: {tripExpense}</div>
                    <button className="moneyButton" >PAY $</button>
                    </div>
                    </Typography>
                    <Typography>
                      Who to pay:
                    </Typography>
                    {this.props.currentUser ? <Typography>
                      (People you owe)
                    </Typography>: <Typography>You're all set!</Typography>}
                    <button className='button'>Receipts</button> | <button className='button'>Images</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        </div>
        </>
    );
  }
}

export default PastTrips;