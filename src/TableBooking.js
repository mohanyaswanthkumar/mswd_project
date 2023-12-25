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
function TableBooking()
{
    const [peo,setPeo]=useState(0);
    const [cou,setCou]=useState(0);
    const [seats,setSeats]=useState(null);
    const history=useNavigate();
    const [booking,setBooking]=useState(null);
    Axios.get('http://localhost:8081/getseats',null).then((res)=>{
        setBooking(res.data);
      })
    //const location = useLocation();
    //const restaurent=props.location.state.restaurent;
    var [a,setA]=useState(0);
    var x=0;
    function tablehandle(event)
    {
        var data=new  FormData(event.currentTarget);
        event.preventDefault();
        const pe=data.get('peo');
        if(pe>=8)
        {
            setPeo(0);
            window.alert("Each can select only 8 members!! in");
        }
        else
        {
            setPeo(pe);
        }
        console.log("success",pe);
    }
    function count()
    {
        if(cou!=peo)
        {
            if(x==0)
            {
                setCou(cou+1);
                x=1;
            }
            else
            {
                setCou(cou-1);
                x=0;
            }
        }
        else{
            window.alert("Limit Exceeded");
        }
    }
    if (peo==0)
    {
        return (
            <div>
                <Navigation/>
                <h3>TableBooking Page</h3>
                <div>
                <form onSubmit={tablehandle}>
                Enter number of People:-<input type='number' name='peo' />
                <input type='submit' value='Submit'/>
                </form>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div>
                <Navigation/>
            <h3 className="black" style={{marginLeft:'26%',width:'700px'}}>TableBooking Page</h3>
                <div className="tablefloat">
                <div className="bookslots">
                <div className="clearf">
                    <div className="tables"><Button onClick={count}>1</Button></div>
                    <div className="tables"><Button onClick={count}>2</Button></div>
                    <div className="tables"><Button onClick={count}>3</Button></div>
                    <div className="tables"><Button onClick={count}>4</Button></div>
                    <div className="tables"><Button onClick={count}>5</Button></div>
                    <div className="tables"><Button onClick={count}>6</Button></div>
                    <div className="tables"><Button onClick={count}>7</Button></div>
                    <div className="tables"><Button onClick={count}>8</Button></div>
                    <div className="tables"><Button onClick={count}>9</Button></div>
                    <div className="tables"><Button onClick={count}>10</Button></div>
                </div>
                <div className="clearf">
                <div className="tables"><Button onClick={count}>11</Button></div>
                    <div className="tables"><Button onClick={count}>12</Button></div>
                    <div className="tables"><Button onClick={count}>13</Button></div>
                    <div className="tables"><Button onClick={count}>14</Button></div>
                    <div className="tables"><Button onClick={count}>15</Button></div>
                    <div className="tables"><Button onClick={count}>16</Button></div>
                    <div className="tables"><Button onClick={count}>17</Button></div>
                    <div className="tables"><Button onClick={count}>18</Button></div>
                    <div className="tables"><Button onClick={count}>19</Button></div>
                    <div className="tables"><Button onClick={count}>20</Button></div>
                </div>
                Total Seats Clicked:- <h4>{cou}</h4>
                <input type="submit" value="Book" onClick={(()=>{
                    Axios.post("http://localhost:8081/seats",{seats:cou}).then(()=>{
                        window.alert("Booked");
                        history('/nearby');
                    })
                })}/>
                </div>
                </div>
               <br></br>
               <br></br>
               <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">S.No</StyledTableCell>
            <StyledTableCell align="left">User Mail</StyledTableCell>
            <StyledTableCell align="left">Restaurent Name</StyledTableCell>
            <StyledTableCell align="left">Seats Booked</StyledTableCell>
            <StyledTableCell align="left">Time Remaining</StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </div>
            
        )
    }

}
export default TableBooking;