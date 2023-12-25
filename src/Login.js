import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Menu from './Menu';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo  from './download.jpeg';
import Back  from './new1.png';
import Axios from 'axios';
import {useState} from 'react';
import emailjs from 'emailjs-com';
import otpGenerator from 'otp-generator';
const theme = createTheme();

export default function SignIn() {
  const [result,setResult]=useState(null);
    const [un,setUn]=useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUn(data.get('email'));
    console.log(un);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    Axios.get("http://localhost:8081/check",{
      params:{
        email:data.get('email'),
        password:data.get('password'),
      }
    }).then((resp)=>{
     setResult(resp.data);
     emailjs.sendForm('service_08rfgeg', 'template_piaqsbh', event.target, '5RcqGodmcPEasr7Ul')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    })
  };
  const history=useNavigate();
if((result==null)||(result=="fail"))
{
  if(result=="fail")
  {
    window.alert("Incorrect Email Id or Password . Please Try Again.");
  }
  return (
    <div className='App-login'>
    <ThemeProvider theme={theme}>
    <Grid container justifyContent='center' alignItems='center'>
                        <Box
                            sx={{
                                width: '30%',
                                marginTop: '8.5%'
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/reg" variant="body2">
                  {"Don't have an account? Sign Up"}
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
else
{
  return(
    /* <Menu mail={un}/> */
    
    history('/menu',{state:{id:un}})
    
  )
}
  }