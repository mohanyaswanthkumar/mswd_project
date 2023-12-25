import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import Navigation from './Navigation';
import { useState } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
function Allusers() {
    const [users, setUsers] = useState(null);
    Axios.get("http://localhost:8081/users",null).then((res)=>{
    setUsers(res.data);
        })
    if(users==null)
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
      <Table sx={{ minWidth: 620 }} aria-label="caption table">
        <TableHead >
          <TableRow>
            <StyledTableCell align="left">S.No</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Age</StyledTableCell>
            <StyledTableCell align="left">Address</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row,index) => (
            <TableRow key={index}>
                <TableCell align="left">{index+1}</TableCell>
              <TableCell align="left">
                {row.fname+" "+row.lname}
              </TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.mobile}</TableCell>
              <TableCell align="left">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
  
}
export default Allusers;