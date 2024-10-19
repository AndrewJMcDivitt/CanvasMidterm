import React, { useState } from 'react';
import { Typography, Box, Link, Alert } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { TextInput, Button } from '../components/common';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    if (isValid) {
      const loginSuccess = await login({ email, password });
      if (loginSuccess) {
        console.log('Login successful');
        navigate('/');
      } else {
        console.log('Login failed');
        setLoginError('Invalid email or password');
      }
    }
  };

  return (
    <Layout>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: 'auto',
        mt: 4
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign in
        </Typography>
        {loginError && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{loginError}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextInput
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextInput
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Register here"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginPage;