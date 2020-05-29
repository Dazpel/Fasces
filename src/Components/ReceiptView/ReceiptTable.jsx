import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Progress from '../progress/Progress';
import Grid from '@material-ui/core/Grid';
import ImageModal from './receiptImageModal'
import { Link } from 'react-router-dom';
import {
  saveReceipt,
  receiptListArr,
  updateReceiptArr,
  sentinel,
} from '../firebase/firebase.utils';
import './receipt.css';

export default class ReceiptTable extends Component {
  state = {
    imageArr: '',
    
  };

  updateArr = async () => {
    try {
      let list = await receiptListArr(this.props.query, this.props.currentUser);
      this.setState({
        imageArr: list,
      });
    } catch (error) {
      console.log('Error adding list', error);
    }
  };

  async componentDidMount() {
    
    try {
      let list = await receiptListArr(this.props.query, this.props.currentUser, this.updateArr);
      this.setState({
        imageArr: list,
      });
    } catch (error) {
      console.log('Error adding list', error);
    }
  }

  render() {
    const { imageArr } = this.state;
    let expenses = 0

    const receipTable = (list) => {
      return (
        <div className="receipTable">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="bold">Image</TableCell>
                <TableCell className="bold" align="right">
                  Upload Date
                </TableCell>
                <TableCell className="bold" align="right">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((el, i) => (
                
                (expenses+=el.amount),
                <TableRow key={el.id}>
                  <TableCell className="bold">
                  <ImageModal url={el.url} btnName={`Receipt ${i}`} />
                  </TableCell>
                  <TableCell align="right">{el.createdAt}</TableCell>
                  <TableCell align="right">{el.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container justify="center" alignItems="center" className='receipTable-expenses'>
          <Typography variant="subtitle1" gutterBottom>
       {`Current expenses: ${expenses.toFixed(2)}$`}
      </Typography>
          </Grid>
          
        </div>
      );
    };

    return <div>{imageArr ? receipTable(imageArr) : <Progress />}</div>;
  }
}
