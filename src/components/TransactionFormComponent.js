import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      _id
      amount
      description
      name
      date 
      type 
      paymentAccount 
    }
  }
`;

const TransactionFormComponent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    name: '',
    date: '', // Add date field
    type: '', // Add TransactionType field
    paymentAccount: '', // Add paymentAccount field
  });
  

  const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION);

  const handleSubmit = (e) => {
    e.preventDefault();

    createTransaction({
      variables: {
        input: {
          amount: formData.amount,
          description: formData.description,
          name: formData.name,
          date: formData.date, // Add date field
          type: formData.type, // Add TransactionType field
          paymentAccount: formData.paymentAccount, // Add paymentAccount field
        },
      },
    })
    
      .then((response) => {
        console.log('Transaction created:', response.data.createTransaction);
        // Handle success, e.g., show a success message or redirect to another page
        // Display success toast
        toast({
          title: 'Transaction saved',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Navigate to the transactions page
        navigate('/transactions');
      })
      .catch((error) => {
        console.error('Transaction creation error:', error);
        // Handle error, e.g., show an error message
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  

  return (
    <Box maxW="container.sm" mx="auto" py={8}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Transaction Type</FormLabel>
        <Input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Payment Account</FormLabel>
        <Input
          type="text"
          name="paymentAccount"
          value={formData.paymentAccount}
          onChange={handleChange}
        />
      </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          mt={4}
          isLoading={loading}
          loadingText="Submitting"
        >
          Create Transaction
        </Button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </Box>
  );
};

export default TransactionFormComponent;
