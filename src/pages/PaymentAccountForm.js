import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PaymentAccountFormComponent from '../components/PaymentAccountFormComponent';

const PaymentAccountForm = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Payment Account Form
      </Text>
      <Box>
        <PaymentAccountFormComponent />
      </Box>
    </Box>
  );
};

export default PaymentAccountForm;
