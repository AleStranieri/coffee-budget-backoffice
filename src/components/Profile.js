import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box, Image, Text } from '@chakra-ui/react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Box>
        <Image src={user.picture} alt={user.name} />
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </Box>
    )
  );
};

export default Profile;