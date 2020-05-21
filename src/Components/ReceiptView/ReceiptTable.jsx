import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Progress from '../progress/Progress';
import { Link } from 'react-router-dom';
import {
  saveReceipt,
  receiptListArr,
  updateReceiptArr,
  sentinel,
} from '../firebase/firebase.utils';
import './receipt.css'

export default class ReceiptTable extends Component {
  state = {
    imageArr: '',
  };

  updateArr = async () => {

    console.log('beign called')

    try {
      let list = await receiptListArr();
      this.setState({
        imageArr: list,
      });
    } catch (error) {
      console.log('Error adding list', error);
    }
  };

  async componentDidMount() {
    try {
      let list = await receiptListArr(this.updateArr);
      this.setState({
        imageArr: list,
      });
    } catch (error) {
      console.log('Error adding list', error);
    }
  }

  render() {
    const { imageArr } = this.state;

    const receipTable = (list) => {

      return (
        <div className='receipTable'>
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
                <TableRow key={el.id}>
                  <TableCell className="bold">
                    <a href={el.url}>{`Receipt ${i}`}</a>
                  </TableCell>
                  <TableCell align="right">{el.createdAt}</TableCell>
                  <TableCell align="right">{el.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    };

    return <div>{imageArr ? receipTable(imageArr) : <Progress />}</div>;
  }
}
