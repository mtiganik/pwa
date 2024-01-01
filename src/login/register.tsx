import React, {useState} from "react"
import { Container,Link, CssBaseline, Box, Avatar, Typography, TextField,Button, Grid } from "@mui/material";
import Copyright from "./copy-right";
import LockOutlinedIcon from '@mui/icons-material/LockOpen';
import axios from "axios";
import GetUrl from "../utils/get-url";
import { useNavigate } from "react-router-dom";
import InitializeNewUserData from "../utils/initialize-new-user";

export default function Register() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate();
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  }
  const validateConfirmPassword = () => {
    setConfirmPasswordError(confirmPassword !== password)
  }

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    setPasswordError(!passwordRegex.test(password))
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if(passwordError || emailError || confirmPasswordError){
      setServerError("Form has errors, please correct them")
    }else{
      setServerError("")
      const data = new FormData(event.currentTarget);
      try{
        const url = GetUrl();
        var response = await axios.post(`${url}Account/Register`,{
          email: email,
          password: password,
          firstName: data.get("firstName"),
          lastName: data.get("lastName")
        })
        response.data.email = email
        localStorage.setItem('userData', JSON.stringify(response.data))

        InitializeNewUserData()
        navigate('/')
      }catch(error){
        console.error(error);
        if(axios.isAxiosError(error)){
          if(error.response && error.response.data && error.response.data.messages)
          setServerError(error.response.data.messages)
        }
        else{
          setServerError(' An error occured while loggin in.')
        }
      }
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              error={emailError}
              helperText={emailError ? 'Invalid email address' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur = {validatePassword}
              error={passwordError}
              helperText = { passwordError 
                ? 'Password must be at least 6 characters and contain at least one uppercase, lowercase, a number and a special character'
              : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur = {validateConfirmPassword}
              error={confirmPasswordError}
              helperText = { confirmPasswordError 
                ? 'Passwords dont match'
              : ''}

            />
            <Typography color="red">
              {serverError}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have account? Sign in instead"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
