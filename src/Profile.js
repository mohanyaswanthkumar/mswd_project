import Navigation from "./Navigation";
import Avatara from './avatar.png';
import Axios from 'axios';
import {useState} from 'react';
import { Button, InputLabel } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
function Profile({store})
{
    var [detail,setDetail]=useState({});
    Axios.get("http://localhost:8081/prof",null).then((res)=>{
    setDetail(res.data);
        })

        function updatepro(event)
        {
          var data=new  FormData(event.currentTarget);
          Axios.post('http://localhost:8081/proupdate',{fname:data.get('fname'),
    lname:data.get('lname'),
    email: data.get('email'),
    age:data.get('age'),
    gender:data.get('gender'),
    mobile:data.get('mobile'),
    address:data.get('address'),
  }).then((resp)=>{
    console.log(resp.data);
  })
        }
        
   let   fileUpload = (event) => {
    var datam=new  FormData(event.currentTarget);
        //let src = event.currentTarget.value.getAsDataURL();
        console.log(datam.get("imag"));
        Axios.post("http://localhost:8081/img",{params:{image:datam.get("imag").getAsDataURL()}}).then((res)=>{
            alert("Image uploaded Successfully")
          })
      }
        return (
            <div>
                <div><Navigation /></div>
                <div className="pbody">
                    <div className="bleft">
                        <ul>
                        <li><img src={Avatara} alt="Pineapple" width="210" height="210" /></li>
                        <br></br>
                        <br></br>
                        <form onSubmit={fileUpload}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" name="imag" />
        Edit Profile <PhotoCamera />
      </IconButton>
                         <br></br>
                         <input type="submit" value="Submit"/>
                        </form>
                        <br></br>
                        <br></br>
                        <li><h3>{detail.fname+" "+detail.lname}</h3></li>
                        <br></br>
                        <br></br>
                            <li><a href="/profile">Profile</a></li>
                            <br></br>
                            <br></br>
                            <li><a href="/changepass">Change Password</a></li>
                        </ul>
                    </div>
                    <div className="bright">
                        <h3>General Information</h3>
                        <br></br>
                        <br></br>
                        <form>
                    <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel>First Name</InputLabel>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="firstName"
                  value={detail.fname}
                />
              </Grid>
              <Grid item xs={18} sm={6}>
              <InputLabel>Last Name</InputLabel>
                <TextField
                  required
                  fullWidth
                  name="lname"
                  autoComplete="family-name"
                  value={detail.lname}
                />
              </Grid>
              </Grid>
              <br></br>
              <Grid item xs={12} sm={6}>
              <InputLabel>Email</InputLabel>
                <TextField
                  required
                  fullWidth
                  name="email"
                  autoComplete="family-name"
                  value={detail.email}
                />
              </Grid>
              <br></br>
              <Grid item xs={12}>
              <InputLabel>Mobile Number</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  value={detail.mobile}
                 />
              </Grid>
              <br></br>
              <Grid item xs={12}>
              <InputLabel>Address</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="addr"
                  name="address"
                  value={detail.address}
                   />
              </Grid>
              <br></br>
              <Grid container spacing={2}> 
              <Grid item xs={12} sm={6}>
              <InputLabel>Age</InputLabel>
                <TextField
                  required
                  fullWidth
                  name="age"
                  autoComplete="family-name"
                  value={detail.age}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <InputLabel>Gender</InputLabel>
              <select name="gender" id="gender" value={detail.gender}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
              </Grid>
              </Grid>
              
              <br></br>
              <br></br>
    <div style={{float:'left',margin:"5px",color:"black"}}><button onClick={updatepro}><a>Update</a></button></div>
    <div style={{float:'left',margin:"5px"}}><button><a>Cancel</a></button></div>
    </form>
                    </div>
                </div>
                
            </div>
        )
    

}
export default Profile;