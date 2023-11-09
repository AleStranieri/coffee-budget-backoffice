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
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_ENUM_TRANSACTIONTYPE,
  GET_ENUM_TRANSACTIONSTATUS,
  GET_PAYMENT_ACCOUNTS,
  GET_TRANSACTION,
} from '../graphql/queries';
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations';

const TransactionFormComponent = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const isEditMode = !!id; // Check if it is edit mode or add mode
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({ 
      amount: '',
      description: '',
      name: '',
      date: new Date().toISOString().split('T')[0],
      type: '',
      paymentAccount: '',
      status: '',
      //recurringTransaction: ''
  });
  
  const { loading: getTransactionLoading, error: getTransactionError, data: getTransactionData } = useQuery(GET_TRANSACTION, {
    variables: {
      transactionId: id // assuming you have the id from useParams
    },
    skip: !id,
  });
  const { loading: enumTypeLoading, error: enumTypeError, data: enumTypeData } = useQuery(GET_ENUM_TRANSACTIONTYPE);
  const { loading: enumStatusLoading, error: enumStatusError, data: enumStatusData } = useQuery(GET_ENUM_TRANSACTIONSTATUS);
  const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(GET_PAYMENT_ACCOUNTS);

  const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION);
  const [updateTransaction, { updateLoading, updateError }] = useMutation(UPDATE_TRANSACTION);
  
  useEffect(() => {
    // If it is edit mode and data is fetched, set the initial values of the form fields
    if (isEditMode && !getTransactionLoading && getTransactionData) {
      setFormData((prevData) => ({
        ...prevData,
        date: new Date(getTransactionData.getTransaction.date/1).toISOString().split('T')[0],
      }));
      setFormData((prevData) => ({
        ...prevData,
        amount: getTransactionData.getTransaction.amount,
      }));
      if(getTransactionData.getTransaction.description) {
        setFormData((prevData) => ({
          ...prevData,
          description: getTransactionData.getTransaction.description,
        }));
      }
      setFormData((prevData) => ({
        ...prevData,
        name: getTransactionData.getTransaction.name,
      }));
      setFormData((prevData) => ({
        ...prevData,
        status: getTransactionData.getTransaction.status,
      }));
      setFormData((prevData) => ({
        ...prevData,
        type: getTransactionData.getTransaction.type,
      }));
      setFormData((prevData) => ({
        ...prevData,
        paymentAccount: getTransactionData.getTransaction.paymentAccount._id,
      }));
      // if(getTransactionData.getTransaction.recurringTransaction) {
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     recurringTransaction: getTransactionData.getTransaction.recurringTransaction._id,
      //   }));
      // }
    }

    if(!isEditMode) {
 
      if (!enumTypeLoading && enumTypeData) {
        setFormData((prevData) => ({
          ...prevData,
          type: enumTypeData.__type.enumValues[0].name,
        }));
      }
    
      if (!paymentLoading && paymentData && paymentData.getPaymentAccounts.docs.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          paymentAccount: paymentData.getPaymentAccounts.docs[0]._id,
        }));
      }
    
      if (!enumStatusLoading && enumStatusData) {
        setFormData((prevData) => ({
          ...prevData,
          status: enumStatusData.__type.enumValues[0].name,
        }));
      }
    }
  }, [
        isEditMode, 
        getTransactionLoading,
        getTransactionData, 
        enumTypeLoading, 
        enumTypeData, 
        paymentLoading, 
        paymentData, 
        enumStatusLoading, 
        enumStatusData
      ]
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isEditMode) {
      updateTransaction({
        variables: {
          updateTransactionId: id, 
          input: formData
        }
      })
      .then((response) => {
        console.log('Transaction updated:', response.data.updateTransaction);
        toast({
          title: 'Transaction updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/transactions');
      })
      .catch((error) => {
        console.error('Transaction creation error:', error);
      });
    } else {
      createTransaction({
        variables: {
          input: formData,
        },
      }).then((response) => {
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
  
    }
      
  };

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    const fieldValue = fieldName === 'amount' ? parseFloat(value) : value;
    console.log(fieldValue);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
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
          <Select
            name="type"
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
