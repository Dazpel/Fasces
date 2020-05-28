import React, { Component } from 'react';
import { updateReceiptArr } from '../firebase/firebase.utils';
import axios from 'axios';
import ReceiptTable from './ReceiptTable';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import ToastMessage from '../Toast/toastMessage';
import Chat from '../Chat/Chat'
import './receipt.css';
import {calculateTotal} from '../Algorithm/receiptAlgorithm'


//API KEY FOR OCR SCAN
let MY_URL_KEY = '31bb9650994211eab7efc1191d38e165';

export default class Receipt extends Component {
  state = {
    imageUrl: undefined,
    saved: false,
  };

  //IN THIS FUNCTION WE MAKE A CALL TO THE ACR SCAN API AND WE PASS THE DATA WE RECIEVE TO
  //FIREBASE FOR STORAGE
  getReceiptData = async (urlImage, currentTrip) => {
    const { url, id } = urlImage
    let file = {
      url: url,
      headers: {
        'x-custom-key': 'string',
      },
    };
    
    axios
      .post('https://api.taggun.io/api/receipt/v1/simple/url', file, {
        headers: {
          apikey: MY_URL_KEY,
        },
      })
      .then(function (response) {
        //  IF SUCCESSFULL SAVE THE DATA TO FIREBASE
        //response.data.totalAmount.data is the recipt total (add this.props.currentUser.currentTrip)
        calculateTotal(response.data.totalAmount.data, 'f58d90a816b9', 'this.props.currentUser')
        updateReceiptArr(id, url, response.data.totalAmount.data, currentTrip);
      })
      .catch(function (error) {
        console.log(error);
      });

    //CLEAN STATE FOR ANOTHER IMAGE TO BE UPLOADED IF NEEDED

    this.setState({
      imageUrl: undefined,
      saved:true,
    });
  };

  //TRIGGER THE OCR SCAN FUNCTION
  uploadAndScan = async (url, currentTrip) => {
    console.log(currentTrip)
    await this.getReceiptData(url, currentTrip);
  };

  //UPLOAD FILE TO CLOUDINARY AND GET THE IMG URL AND ID
  handleFileUpload = (e) => {
    //CLOUDINARY CONFIG VALUES
    const cloudName = 'dsxn0sfql';
    const preset = 'w8mpx9l6';
    let imgFile = e.target.files[0];

    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);

        var url = response.secure_url;
        var id = response.asset_id;

        // UPDATE STATE WITH IMAGE URL AND ID
        this.setState({
          imageUrl: {
            url: url,
            id: id,
          },
          saved:false,     
        });
      }
    };
    //POST REQUEST FIELDS
    fd.append('upload_preset', preset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', imgFile);
    xhr.send(fd);
  };

  render() {
    let currentTrip = ''
    if (this.props.currentUser.queryID){
      currentTrip = this.props.currentUser.queryID
    }else{
      currentTrip = this.props.currentUser.currentTrip
    }
    let onUp = false;
    let onSaved = this.state.saved;
    (this.state.imageUrl===undefined) ? onUp = false : onUp=true;
    (onSaved) ? onSaved = true : onSaved=false;
    console.log(this.props.currentUser)
    return (
      <div>
        <div className="table">
          <ReceiptTable currentUser={this.props.currentUser}/>
        </div>

        <Grid container justify="center" alignItems="center" className='receiptBtn'>
          <Button
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => this.uploadAndScan(this.state.imageUrl, currentTrip)}
          >
            Save
          </Button>
          <input
            accept="image/*"
            className="uploadFile groupBtn"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => this.handleFileUpload(e)}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="default"
              size="small"
              component="span"
              className="groupBtn"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
        </Grid>
       {
         onUp ? <ToastMessage message={'Success, ready to save!'} /> : ''
       }
       {
         onSaved ? <ToastMessage message={'Receipt saved!'} /> : ''
       }
        
      </div>
    );
  }
}
