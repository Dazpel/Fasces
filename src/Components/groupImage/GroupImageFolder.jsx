import React from 'react';
import Progress from '../progress/Progress';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GroupImageModal from './groupImageModal'

// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import './groupImage.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '20px',
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: '100%g',
  },
  title: {
    marginBottom: 20,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function GroupImageFolder({ imageArr }) {
  const classes = useStyles();

  //  const { imageArr } = this.props;

  const displayImages = (list) => {
   
    return (
      <div className={classes.root}>
        <div className={classes.title}>My Trip</div>

        <GridList cellHeight={180} className={classes.gridList}>
          {list.map((tile, i) => (
            <GridListTile key={i}>
              <GroupImageModal url={tile} />
              {/* <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                /> */}
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  return <div>{imageArr ? displayImages(imageArr) : <Progress />}</div>;
}
