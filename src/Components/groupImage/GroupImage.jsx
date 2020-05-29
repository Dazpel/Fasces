import React, { Component } from 'react';
import GroupImageFolder from './GroupImageFolder';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import ToastMessage from '../Toast/toastMessage';
import actions from '../../RouteContainer/axiosCalls';
import { retrieveImages, updateImageArr } from '../firebase/firebase.utils';
import './groupImage.css';

export default class GroupImage extends Component {
  state = {
    imageUrl: undefined,
    imageArr: '',
    saved: false,
  };

  updateArr = async (user, query) => {
    let arr = await retrieveImages(user, query);

    this.setState({
      imageArr: arr,
    });
  };

  componentDidMount() {

    this.updateArr(this.props.currentUser, this.props.query);
  }

  // this method handles just the file upload
  handleFileUpload = async (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imageUrl', e.target.files[0]);

    await actions
      .uploadToCD(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        console.log(response);
        this.setState({ imageUrl: response.data.secure_url, saved: false });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  // THIS METHOD ADDS THE IMAGE TO THE LIST
  handleSubmit = async (url, currentTrip) => {
    // await actions.uploadToDB(this.state);
    await updateImageArr(url, currentTrip);

    this.setState({
      imageUrl: undefined,
      saved: true,
    });

    this.updateArr(this.props.currentUser);
  };

  render() {
    let onUp = false;
    let onSaved = this.state.saved;
    this.state.imageUrl === undefined ? (onUp = false) : (onUp = true);
    onSaved ? (onSaved = true) : (onSaved = false);

    const { imageArr } = this.state;
    let currentTrip = '';
    if (this.props.query) {
      currentTrip = this.props.currentUser.queryID;
    } else {
      currentTrip = this.props.currentUser.currentTrip;
    }

    return (
      <div>
        <div className="folderContainer">
          <GroupImageFolder imageArr={imageArr} />
        </div>

        <Grid
          container
          justify="center"
          alignItems="center"
          className="folderBtn"
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => this.handleSubmit(this.state.imageUrl, currentTrip)}
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
        {onUp ? <ToastMessage message={'Success, ready to save!'} /> : ''}
        {onSaved ? <ToastMessage message={'Image saved!'} /> : ''}
      </div>
    );
  }
}
