import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class NewHome extends Component {
    render() {
        return (
            <div >
                <Topbar />
                <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography variant="subtitle1" gutterBottom className="">
            we render chat here
          </Typography>
        </Grid>
                <Navbar />
            </div>
        );
    }
}

export default NewHome;