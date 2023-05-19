import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in based on your authentication logic
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      setIsLoggedIn(!!token); // Update the isLoggedIn state based on the presence of the token
    };

    checkLoggedInStatus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });

      const token = data.login.token;
      localStorage.setItem('authToken', token);

      // Handle successful login, e.g., redirect to another page or update app state
      console.log('Logged in successfully! Token:', token);

      setIsLoggedIn(true); // Update the isLoggedIn state to true
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the isLoggedIn state to false
  };

  if (isLoggedIn) {
    // If the user is already logged in, render the logout link
    return (
      <Box maxW="sm" mx="auto" mt={8}>
        <Button colorScheme="blue" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="sm" mx="auto" mt={8}>
      <form onSubmit={handleLogin}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Login
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    </Box>
  );
};

export default LoginForm;
