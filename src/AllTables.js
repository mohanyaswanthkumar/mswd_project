import { useState,useEffect } from "react";
import Navigation from "./Navigation";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from "react-router-dom";
import { red } from '@mui/material/colors';
import  Axios  from "axios";
import Menu from './Menu';
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
function AllTables()
{
    const history=useNavigate();
    const [booking,setBooking]=useState(null);
    Axios.get('http://localhost:8081/getallseats',null).then((res)=>{
        setBooking(res.data);
      })
    if(booking!=null)
    {
        return(
            <div>
                <Navigation/>
               <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">S.No</StyledTableCell>
            <StyledTableCell align="left">User Mail</StyledTableCell>
            <StyledTableCell align="left">Restaurent Name</StyledTableCell>
            <StyledTableCell align="left">Seats Booked</StyledTableCell>
            <StyledTableCell align="left">Time Remaining</StyledTableCell>
           < StyledTableCell align="left">Remove seat Links</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booking.map((row,index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell align="left"> {row.email}</StyledTableCell>
              <StyledTableCell align="left"> {row.restaurent}</StyledTableCell>
              <StyledTableCell align="left">{row.seats}</StyledTableCell>
              <StyledTableCell align="left">10:00</StyledTableCell>
              <StyledTableCell align="left"><button style={{backgroundColor:'red'}} onClick={()=>{
                Axios.post('http://localhost:8081/unlinkseats',{mail:row.email,seats:row.seats}).then((res)=>{
                  alert("Removed Successfully");
                })
              }}>Unlink Seats</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </div>
            
        )
    }

}
export default AllTables;