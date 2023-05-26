import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { CREATE_DEBIT_PAYMENT_ACCOUNT, CREATE_CREDIT_PAYMENT_ACCOUNT } from '../graphql/mutations';
import { GET_PAYMENT_ACCOUNTS } from '../graphql/queries';

const PaymentAccountFormComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [paymentAccountType, setPaymentAccountType] = useState('DEBIT');
  const [amount, setAmount] = useState(0);
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [executionDate, setExecutionDate] = useState('');
  const [accountParent, setAccountParent] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const [createDebitPaymentAccount] = useMutation(CREATE_DEBIT_PAYMENT_ACCOUNT);
  const [createCreditPaymentAccount] = useMutation(CREATE_CREDIT_PAYMENT_ACCOUNT);

  const { loading: debitAccountLoading, error: debitAccountError, data: debitAccountData } = useQuery(GET_PAYMENT_ACCOUNTS, {
        where : {
            type: 'DEBIT',
        }
  });
  useEffect(() => {
    if (!debitAccountLoading && debitAccountData && debitAccountData.getPaymentAccounts.docs.length > 0) {
        setAccountParent(() => ({
          accountParent: debitAccountData.getPaymentAccounts.docs[0]._id,
        }));
      }
  },[
    debitAccountLoading, 
    debitAccountData,
  ]);

  const handleChange = (e) => {
    setAccountParent(() => ({
      accountParent: e.target.value,
    }));
    console.log(accountParent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the form data
    const paymentAccountData = {
      name,
      description,
    };

    if (paymentAccountType === 'DEBIT') {
      paymentAccountData.amount = parseFloat(amount);
    } else if (paymentAccountType === 'CREDIT') {
      paymentAccountData.spendingLimit = parseFloat(spendingLimit);
      paymentAccountData.executionDate = executionDate;
      paymentAccountData.accountParent = accountParent.accountParent;
    }

    try {
      if (id) {
        // Update existing payment account
        // Update mutation for debit and credit accounts separately if needed
      } else {
        // Create new payment account
        if (paymentAccountType === 'DEBIT') {
          await createDebitPaymentAccount({
            variables: paymentAccountData,
          });
        } else if (paymentAccountType === 'CREDIT') {
          await createCreditPaymentAccount({
            variables: paymentAccountData,
          });
        }
      }

      // Redirect to payment accounts page after successful form submission
      navigate('/payment-accounts');
    } catch (error) {
      console.error('Error submitting payment account form:', error);
      // Handle error scenario as needed
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormControl>
        <FormControl id="description" mb={4}>
          <FormLabel>Description</FormLabel>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="paymentAccountType" mb={4}>
          <FormLabel>Payment Account Type</FormLabel>
          <Select value={paymentAccountType} onChange={(e) => setPaymentAccountType(e.target.value)}>
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
          </Select>
        </FormControl>
        {paymentAccountType === 'DEBIT' && (
          <FormControl id="amount" mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </FormControl>
        )}
        {paymentAccountType === 'CREDIT' && (
          <>
            <FormControl id="spendingLimit" mb={4}>
              <FormLabel>Spending Limit</FormLabel>
              <Input type="number" value={spendingLimit} onChange={(e) => setSpendingLimit(e.target.value)} required />
            </FormControl>
            <FormControl id="executionDate" mb={4}>
              <FormLabel>Execution Date</FormLabel>
              <Input type="date" value={executionDate} onChange={(e) => setExecutionDate(e.target.value)} required />
            </FormControl>
            <FormControl id="accountParent" mb={4}>
              <FormLabel>Account Parent</FormLabel>
              <Select
            name="accountParent"
            label="Account Parent"
            value={accountParent.accountParent || ''}
            onChange={handleChange}
          >
            {!debitAccountLoading &&
              !debitAccountError &&
              debitAccountData.getPaymentAccounts.docs.map((paymentAccount) => (
                <option key={paymentAccount._id} value={paymentAccount._id}>
                  {paymentAccount.name}
                </option>
              ))}
          </Select>
            </FormControl>
          </>
        )}
        <Button type="submit" colorScheme="teal" mr={2}>
          Save
        </Button>
        <Button onClick={() => navigate('/payment-accounts')}>Cancel</Button>
      </form>
    </Box>
  );
};

export default PaymentAccountFormComponent;
