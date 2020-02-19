import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default class TableView extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = { rows: [], columns: [] }
  }


  load = (data) => {
    let maxSize = 0
    let maxSizeItem = {}
    data.forEach(item => {
      const wow = Object.keys(item).length
      if (wow > maxSize) {
        maxSize = wow
        maxSizeItem = item
      }
    })
    const columns = Object.keys(maxSizeItem) || []
    const newData = data.map(item => {
      columns.forEach((col, index) => {
        const value = item[col]
        if ((typeof value) === 'object') {
          item[col] = JSON.stringify(value).substring(0, 300)
        }
        if ((typeof value) === 'array') {          
          item[col] = value.join(",").substring(0, 300)
          
        }
        if ((typeof value) === 'boolean') {
          item[col] = value.toString()          
        }
      })
      return item
    })
    this.setState({ rows: newData, columns: columns })
  }

  useStyles = () => makeStyles({
    table: {
      minWidth: 650,
    }
  });

  render() {
    const classes = this.useStyles();

    const tableHeaders = this.state.columns.map(item => {
      return <TableCell>{item}</TableCell>
    })

    const tableRows = this.state.rows.map((row) => {
      const tableRow = this.state.columns.map(col => {
        return <TableCell component="th" scope="row">{row[col]}</TableCell>
      })
      return <TableRow>
        {tableRow}
      </TableRow>
    })

    return (
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}