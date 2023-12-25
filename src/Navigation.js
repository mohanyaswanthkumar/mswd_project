import Link from '@mui/material/Link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Axios from 'axios';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Navigation()
{
  const history=useNavigate();
  function logout()
  {
    Axios.post("http://localhost:8081/logout",null).then((res)=>{
      window.alert("logout successfully");
    history("/");
    })
  }
  const [rol,setRole]=useState(null);
  Axios.get("http://localhost:8081/prof",null).then((resp)=>{
      setRole(resp.data.role);
  })
 if(rol=="admin")
 {
  return(
    <div>
      <ul className='nav'>
      <li><a href='/menu' className='nav'>Menu</a></li>
      <li><a href='/allusers' className='nav'>All Users</a></li>
      <li><a href='/allorders' className='nav'>All Orders</a></li>
      <li><a href='/alltables' className='nav'>Tables Booked</a></li>
      <li style={{float:'right'}}><a href='/'>Logout </a></li>
      <li style={{float:'right'}}>
        <a href='/profile'> <Avatar /> </a>
      </li>
      </ul>
    </div>
  )
 }
  return(
    <div>
       <ul className='nav'>
       <li><a href='/menu' className='nav'>Menu</a></li>
       <li><a href='/nearby' className='nav'>Near By Restaurents</a></li>
      <li><a href='/track' className='nav'>My Orders</a></li>
      <li><a href='/locset' className='nav'>Table Booking</a></li>
      <li><a href='/cart' className='nav'><ShoppingCartIcon /> My Cart</a></li>
      <li style={{float:'right'}}><a href='/'onClick={logout} >Logout </a></li>
      <li style={{float:'right'}}>
        <a href='/profile'> <Avatar /> </a>
      </li>
      </ul>
    </div>
  )

}
export default Navigation;
