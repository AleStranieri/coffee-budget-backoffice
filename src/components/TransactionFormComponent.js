import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  GET_ENUM_TRANSACTIONTYPE,
  GET_ENUM_TRANSACTIONSTATUS,
  GET_PAYMENT_ACCOUNTS,
} from '../graphql/queries';
import { CREATE_TRANSACTION } from '../graphql/mutations';

const TransactionFormComponent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    type: '', // Add TransactionType field
    paymentAccount: '', // Add paymentAccount field
    status: '',
  });

  const { loading: enumTypeLoading, error: enumTypeError, data: enumTypeData } = useQuery(GET_ENUM_TRANSACTIONTYPE);
  const { loading: enumStatusLoading, error: enumStatusError, data: enumStatusData } = useQuery(GET_ENUM_TRANSACTIONSTATUS);
  const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(GET_PAYMENT_ACCOUNTS);

  const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION);

  useEffect(() => {
    if (!enumTypeLoading && enumTypeData) {
      setFormData((prevData) => ({
        ...prevData,
        transactionType: enumTypeData.__type.enumValues[0].name,
      }));
    }
  }, [enumTypeLoading, enumTypeData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createTransaction({
      variables: {
        input: formData,
      },
    })
      .then((response) => {
        console.log('Transaction created:', response.data.createTransaction);
        toast({
          title: 'Transaction saved',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/transactions');
      })
      .catch((error) => {
        console.error('Transaction creation error:', error);
      });
  };

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  console.log(enumTypeData);
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
          <Select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            {!enumTypeLoading &&
              !enumTypeError &&
              enumTypeData.__type.enumValues.map((enumValue) => (
                <option key={enumValue.name} value={enumValue.name}>
                  {enumValue.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Payment Account</FormLabel>
          <Select
            name="paymentAccount"
            value={formData.paymentAccount}
            onChange={handleChange}
          >
            {!paymentLoading &&
              !paymentError &&
              paymentData.getPaymentAccounts.docs.map((paymentAccount) => (
                <option key={paymentAccount._id} value={paymentAccount._id}>
                  {paymentAccount.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Transaction Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {!enumStatusLoading &&
              !enumStatusError &&
              enumStatusData.__type.enumValues.map((enumValue) => (
                <option key={enumValue.name} value={enumValue.name}>
                  {enumValue.name}
                </option>
              ))}
          </Select>
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
