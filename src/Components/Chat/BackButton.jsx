import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'


export default function MenuAppBar() {

  return (
    <div >
      <AppBar position="fixed" style={{backgroundColor: 'white'}}>
        <Toolbar>
          <IconButton>
              <Link to="/" style={{color: "#0095ff"}}><BackIcon/></Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}