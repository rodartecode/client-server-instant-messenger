import React, {useContext} from "react";
import styles from '../styles.module.css'
import { Button, Alert, AlertTitle, AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import useRouter from 'next/router';

const Register = () => {
  const MAX_USERNAME_LENGTH = 30;
  const MAX_PASSWORD_LENGTH = 50;
  const router = useRouter;
  // conditionally display error if login credentials were invalid
  const [showError, setShowError] = React.useState(false);
  const [isUsernameValid, setIsUsernameValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  // true if username is valid, false if not
  const checkUsername = (text) => {
    return !!text && !/[^a-zA-Z0-9]/.test(text) && text.length <= MAX_USERNAME_LENGTH;
  }

  const checkPassword = (text) => {
    return !!text && text.length <= MAX_PASSWORD_LENGTH;
  }

  let user = {username: '', password: ''}
  const handleUsernameChange = (event) => {
    user.username = event.target.value;
    setIsUsernameValid(checkUsername(user.username));
  };

  const handlePasswordChange = (event) => {
    user.password = event.target.value;
    setIsPasswordValid(checkPassword(user.password));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const username = user.username;
    const password = user.password;

    if (!isUsernameValid || !isPasswordValid) {
      return;
    }
    // checks with db that user exists
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/user`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ 'username': username, 'password': password })
    }).then((response) => response.json())
    .then((response) => {
      if (response.message == 'Registration successful') {
        let login_headers = new Headers();
        login_headers.set('Content-Type', 'application/json');
        login_headers.set('Accept', 'application/json');
        login_headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/login`, {
            headers: login_headers,
            method: 'POST',
          }).then((response) => response.json())
          .then((response) => {
            if (response.token) {
              sessionStorage.setItem('token', response['token'])
              sessionStorage.setItem('Username', username);
              router.push('/chatpage');
              return response;
            }
          });
        router.push('/login');
        return response;
      } else {
        setShowError(true);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
        <AppBar sx={{position: 'sticky'}}>
          <Toolbar>
            <Typography variant='h6'>Register</Typography>
            <IconButton
              sx={{marginLeft: 'auto'}}
              aria-label='close'
            >
            </IconButton>
            <Button
              variant='contained'
              type='submit'
              sx={{width: '7%'}}
              href="./login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {showError && <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Registration failed. An account with that username already exists.
        </Alert>}
        <div className={styles.login_box}>
        <Box sx={{my: '10%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <TextField
            error={!isUsernameValid}
            id='outlined-search'
            title='username'
            label='username'
            name='username'
            onChange={handleUsernameChange}
            helperText={isUsernameValid ? "" : "Invalid username."}
            required
            sx={{my: '2%', width: '300px'}}
          />
          <TextField
            error={!isPasswordValid}
            id='outlined-search'
            title='password'
            label='password'
            name='password'
            type='password'
            onChange={handlePasswordChange}
            helperText={isPasswordValid ? "" : "Invalid password."}
            required
            sx={{my: '3%', width: '300px'}}
          />
          <Button
            variant='contained'
            type='submit'
            // onClick={onSubmit}
            sx={{my: '3%', width: '300px'}}>
            Register
          </Button>
          <Typography variant='subtitle1'>
          </Typography>
        </Box>
      </div>
    </form>
  );
};

export default Register;

// const LoginWrapper = () => {
//   return (
//     <Router>
//       <Login />
//     </Router>
//   );
// };

// export default LoginWrapper;
