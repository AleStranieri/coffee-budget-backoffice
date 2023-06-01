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
  GET_RECURRING_TRANSACTION,
  GET_ENUM_TRANSACTIONFREQTYPE,
} from '../graphql/queries';
import {
  CREATE_RECURRING_TRANSACTION,
  UPDATE_RECURRING_TRANSACTION,
} from '../graphql/mutations';

const RecurringTransactionFormComponent = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const isEditMode = !!id; // Check if it is edit mode or add mode
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    status: '',
    type: '',
    frequency_every_n: 1,
    frequency_type: '',
    occurrences: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    paymentAccount: '',
  });

    const { 
        loading: getRecurringTransactionLoading, 
        error: getRecurringTransactionError, 
        data: getRecurringTransactionData 
    } = useQuery(GET_RECURRING_TRANSACTION, {
        variables: {
            recurringTransactionId: id // assuming you have the id from useParams
        }
    });

  const { loading: enumTypeLoading, error: enumTypeError, data: enumTypeData } = useQuery(GET_ENUM_TRANSACTIONTYPE);
  const { loading: enumStatusLoading, error: enumStatusError, data: enumStatusData } = useQuery(GET_ENUM_TRANSACTIONSTATUS);
  const { loading: enumFreqTypeLoading, error: enumFreqTypeError, data: enumFreqTypeData } = useQuery(GET_ENUM_TRANSACTIONFREQTYPE);
  const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(GET_PAYMENT_ACCOUNTS);

  const [createRecurringTransaction, { loading, error }] = useMutation(CREATE_RECURRING_TRANSACTION);
  const [updateRecurringTransaction, { updateLoading, updateError }] = useMutation(UPDATE_RECURRING_TRANSACTION);

  useEffect(() => {
    // If it is edit mode and data is fetched, set the initial values of the form fields
    if (isEditMode && !getRecurringTransactionLoading && getRecurringTransactionData) {
        setFormData((prevData) => ({
            ...prevData,
            name: getRecurringTransactionData.getRecurringTransaction.name,
        }));
        if(getRecurringTransactionData.getRecurringTransaction.description) {
            setFormData((prevData) => ({
                ...prevData,
                description: getRecurringTransactionData.getRecurringTransaction.description,
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            amount: parseFloat(getRecurringTransactionData.getRecurringTransaction.amount),
        }));
        setFormData((prevData) => ({
            ...prevData,
            status: getRecurringTransactionData.getRecurringTransaction.status,
        }));
        setFormData((prevData) => ({
            ...prevData,
            type: getRecurringTransactionData.getRecurringTransaction.type,
        }));
        if(getRecurringTransactionData.getRecurringTransaction.frequency_every_n) {
            setFormData((prevData) => ({
                ...prevData,
                frequency_every_n: getRecurringTransactionData.getRecurringTransaction.frequency_every_n,
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            frequency_type: getRecurringTransactionData.getRecurringTransaction.frequency_type,
        }));
        if (getRecurringTransactionData.getRecurringTransaction.occurrences) {
            setFormData((prevData) => ({
                ...prevData,
                occurrences: parseInt(getRecurringTransactionData.getRecurringTransaction.occurrences),
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            start_date: new Date(getRecurringTransactionData.getRecurringTransaction.start_date/1).toISOString().split('T')[0],
        }));
        if(getRecurringTransactionData.getRecurringTransaction.end_date) {
            setFormData((prevData) => ({
                ...prevData,
                end_date: new Date(getRecurringTransactionData.getRecurringTransaction.end_date/1).toISOString().split('T')[0],
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            paymentAccount: getRecurringTransactionData.getRecurringTransaction.paymentAccount._id,
        }));

        // if(getRecurringTransactionData.getRecurringTransaction.categories) {
        //     setFormData((prevData) => ({
        //         ...prevData,
        //         categories: getRecurringTransactionData.getRecurringTransaction.categories,
        //     }));
        // }
    } else {

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

          if (!enumFreqTypeLoading && enumFreqTypeData) {
            setFormData((prevData) => ({
                ...prevData,
                frequency_type: enumFreqTypeData.__type.enumValues[0].name
            }));
          }
    }
  }, [isEditMode, 
        getRecurringTransactionLoading, 
        getRecurringTransactionData,
        enumTypeLoading, 
        enumTypeData, 
        paymentLoading, 
        paymentData, 
        enumStatusLoading, 
        enumStatusData
    ]);

  const handleInputChange = (event) => {
    
    const { name: fieldName, value } = event.target;
    let fieldValue = value;
    if (fieldName === 'amount') {
        fieldValue = parseFloat(value);
    } 
    
    if (fieldName === 'occurrences') {
        fieldValue = parseInt(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isEditMode) {
        // Perform update mutation
        await updateRecurringTransaction({
          variables: {
            updateRecurringTransactionId: id,
            input: formData,
          },
        });

        toast({
          title: 'Recurring Transaction updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Perform create mutation
        await createRecurringTransaction({
          variables: {
            input: formData,
          },
        });

        toast({
          title: 'Recurring Transaction created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      navigate('/recurring-transactions'); // Redirect to recurring transactions list
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred.',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if ((getRecurringTransactionLoading && isEditMode) || enumTypeLoading || enumStatusLoading || paymentLoading || enumFreqTypeLoading) {
    // Show loading state or spinner
    return <div>Loading...</div>;
  }

  if ((getRecurringTransactionError && isEditMode) || enumTypeError || enumStatusError || paymentError || enumFreqTypeError) {
    // Show error message
    return <div>Error loading data</div>;
  }

  return (
    <Box maxW="container.sm" mx="auto" py={8}>
    <form onSubmit={handleSubmit}>
      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormControl>
      </Box>

      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>
      </Box>

      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </FormControl>
      </Box>

      <Box 
        display='flex' 
        alignItems='baseline' 
        marginBottom={4}>

            <FormControl mr='2'>
                <FormLabel>Type</FormLabel>
                <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                >
                    {!enumTypeLoading &&
                    !enumTypeError &&
                    enumTypeData.__type.enumValues.map((enumValues) => (
                    <option key={enumValues.name} value={enumValues.name}>
                        {enumValues.name}
                    </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl >
                <FormLabel>Status</FormLabel>
                <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                >
                    {!enumStatusLoading &&
                    !enumStatusError &&
                    enumStatusData.__type.enumValues.map((enumValues) => (
                        <option key={enumValues.name} value={enumValues.name}>
                            {enumValues.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
      </Box>

      <Box         
        display='flex' 
        alignItems='baseline' 
        marginBottom={4}>

        <FormControl mr='2'>
          <FormLabel>Frequency Every N</FormLabel>
          <Input
            type="number"
            name="frequency_every_n"
            value={formData.frequency_every_n}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl mr='2'>
          <FormLabel>Frequency Type</FormLabel>
          <Select
            name="frequency_type"
            value={formData.frequency_type}
            onChange={handleInputChange}
            required
          >
            <option value="DAYLY">Dalyy</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Occurrences</FormLabel>
          <Input
            type="number"
            name="occurrences"
            value={formData.occurrences}
            onChange={handleInputChange}
            required
          />
        </FormControl>
      </Box>

      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
          />
        </FormControl>
      </Box>

      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />
        </FormControl>
      </Box>

      <Box marginBottom={4}>
        <FormControl>
          <FormLabel>Payment Account</FormLabel>
          <Select
            name="paymentAccount"
            value={formData.paymentAccount}
            onChange={handleInputChange}
            required
          >
            {paymentData.getPaymentAccounts.docs.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Additional fields for categories */}
      {/* ... */}
      
      <Button type="submit" isLoading={loading || updateLoading}>
        {isEditMode ? 'Update Recurring Transaction' : 'Create Recurring Transaction'}
      </Button>
    </form>
    </Box>
  );
};

export default RecurringTransactionFormComponent;
