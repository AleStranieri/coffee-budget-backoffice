import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import PaymentAccountList from '../components/PaymentAccountList';

const PaymentAccounts = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Payment Accounts
      </Text>
      <Button as={Link} to="/payment-accounts/create" colorScheme="teal" leftIcon={<AddIcon />}>
          New Payment Account
        </Button>
      <Box>
        <PaymentAccountList></PaymentAccountList>
      </Box>
    </Box>
  );
};

export default PaymentAccounts;