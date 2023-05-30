import React from 'react';
import { Box, Text, } from '@chakra-ui/react';
import RecurringTransactionList from '../components/RecurringTransactionList'; 

const RecurringTransactions = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Recurring Transactions
      </Text>
      <Box>
        <RecurringTransactionList></RecurringTransactionList>
      </Box>
    </Box>
  );
};

export default RecurringTransactions;