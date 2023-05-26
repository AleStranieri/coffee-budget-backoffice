import React from 'react';
import { Box, Text, } from '@chakra-ui/react';
import PaymentAccountList from '../components/PaymentAccountList';

const PaymentAccounts = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Payment Accounts
      </Text>
      <Box>
        <PaymentAccountList></PaymentAccountList>
      </Box>
    </Box>
  );
};

export default PaymentAccounts;