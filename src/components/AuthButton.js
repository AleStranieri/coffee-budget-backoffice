import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box, Image, Text } from '@chakra-ui/react';

const AuthButton = () => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <Box>
        <Image
            borderRadius='full'
            boxSize='50px'
            src={user.picture} 
            alt={user.name} 
        />
        <Text>{user.name}</Text>
        {/* <Text>{user.email}</Text> */}
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
      </Box>
    ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )
  );
};

export default AuthButton;