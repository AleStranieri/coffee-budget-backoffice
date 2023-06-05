import React from 'react';
import RecurringTransactionFormComponent from '../components/RecurringTransactionFormComponent';
import { Box, Text } from '@chakra-ui/react';

const RecurringTransactionForm = () => {
  // Handle form submission, data fetching, state management, etc.

  const handleSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Transaction Form</Text>
      <RecurringTransactionFormComponent onSubmit={handleSubmit} />
    </Box>
  );
};

export default RecurringTransactionForm;
