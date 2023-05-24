import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" backgroundColor="gray.200" py={4} textAlign="center">
      <Flex direction="column" alignItems="center">
        <Text fontSize="sm" color="gray.600">© 2023 CoffeeBudget App. All rights reserved.</Text>
        <Text fontSize="sm" color="gray.600">Created by YourName</Text>
      </Flex>
    </Box>
  );
}

export default Footer;