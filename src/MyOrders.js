import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navigation from './Navigation';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';
import { red } from '@mui/material/colors';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
    const [orders,setOrders]=useState(null);
    Axios.get("http://localhost:8081/allord",null).then((res)=>{
        setOrders(res.data);
            })
            if(orders==null)
            {
                return(
                    <div>
                    <Navigation/>
                    No users to display.
                </div>
                )
            }
  return (
    <div>
        <Navigation/>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">S.No</StyledTableCell>
            <StyledTableCell align="left">Item Name</StyledTableCell>
            <StyledTableCell align="left">Quantity</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Payment</StyledTableCell>
            <StyledTableCell align="left">DeliveryMode</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row,index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell align="left"> {row.iname}</StyledTableCell>
              <StyledTableCell align="left">{row.iquantity}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left">{row.payment}</StyledTableCell>
              <StyledTableCell align="left">{row.deliverymode}</StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left"><button style={{backgroundColor:'red'}} onClick={()=>{
                Axios.post('http://localhost:8081/remorder',{iname:row.iname,price:row.price,status:row.status}).then((res)=>{
                  alert("Removed Successfully");
                })
              }}>Delete</button></StyledTableCell>
              {(()=>{
                if(row.payment=="Pending"){
                  <StyledTableCell align="left"><Button>Pay</Button></StyledTableCell>
                }
              })}
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
