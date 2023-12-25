import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from './download.jpeg';
import Background from './Background';
import App from './App';
import Back from  './new1.png';
import {useState} from 'react';
import Axios from 'axios';
import Login from './Login';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Food and Hospitality Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignUp() {
  const handleSubmit = (event) => 
  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    emailjs.sendForm('service_08rfgeg', 'template_rm2s6hh', event.target, '5RcqGodmcPEasr7Ul')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
   
    var phno=String(data.get('mobile'));
    var gmail=data.get('email');
    var spl=gmail.split("@");
    var p=data.get('password');
    //var reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
    var reg=new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    if((reg.test(p)==true)&&(spl[1]=="gmail.com")&&(phno.length==10))
    {
      Axios.post('http://localhost:8081/',{
    fname:data.get('firstName'),
    lname:data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    age:data.get('age'),
    gender:data.get('gender'),
    mobile:Number(data.get('mobile')),
    address:null,
    role:"user",
  }).then((resp)=>{
    console.log(resp.data);
    history("/");
  })
    }
    else
    {
      alert("Your Password is too Weak..!.Please Retry ");
      history("/reg");
    }
    
  
  };
 const history=useNavigate();
  return (
    <div className='App-login'>
    <ThemeProvider theme={theme}>
    <Grid container justifyContent='center' alignItems='center'>
                        <Box
                            sx={{
                                width: '30%',
                                marginTop: '5%'
                            }}
                        >
                            <Grid container item justifyContent='center' direction='column' alignItems='center'>

                                <Grid item>
                                <Avatar  src={Logo}
              style={{

                        width: "90px",
                        height: "90px",
                     }}>
          </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                </Grid>
                            </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name"  name="age" required fullWidth id="age" label="Age" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
              <select name="gender" id="gender">
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Grid>
    </ThemeProvider>
    </div>
  );
}

export default  SignUp;