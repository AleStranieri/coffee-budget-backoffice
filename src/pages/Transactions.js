import React, { useState, useEffect } from 'react';
import { Box, Text, Select, Stack, Input, Button, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import TransactionList from '../components/TransactionList';
import { useQuery } from '@apollo/client';
import { GET_ENUM_TRANSACTIONSTATUS, GET_ENUM_TRANSACTIONTYPE } from '../graphql/queries';

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterRecurringType, setFilterRecurringType] = useState('');

  // Fetch enum values for TransactionStatus and TransactionType
  const { data: statusData } = useQuery(GET_ENUM_TRANSACTIONSTATUS);
  const { data: typeData } = useQuery(GET_ENUM_TRANSACTIONTYPE);

  const transactionStatusValues = statusData?.__type?.enumValues || [];
  const transactionTypeValues = typeData?.__type?.enumValues || [];

    // Set default end date to today + 4 days
  useEffect(() => {
    const today = new Date();
    const defaultEndDate = new Date(today.setDate(today.getDate() + 4)).toISOString().split('T')[0];
    setFilterEndDate(defaultEndDate);
  }, []);
  

  const handleFilterSubmit = () => {
    // Handle the filter submission here
    // You can pass the filter values to the TransactionList component or perform any other filtering logic
    // For example, in this case, we are logging the filter values
    console.log('Filter Status:', filterStatus);
    console.log('Filter Type:', filterType);
    console.log('Filter Start Date:', filterStartDate);
    console.log('Filter End Date:', filterEndDate);
    console.log('Filter Recurring Transaction', filterRecurringType);
  };

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setFilterStartDate(startDate ? new Date(startDate) : '');
    setFilterEndDate(endDate ? new Date(endDate) : '');
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Transactions
      </Text>
      <Stack direction="row" spacing={4} mb={4}>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {transactionStatusValues.map((status) => (
            <option key={status.name} value={status.name}>{status.name}</option>
          ))}
        </Select>
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Type</option>
          {transactionTypeValues.map((type) => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </Select>
        <Select value={filterRecurringType} onChange={(e) => setFilterRecurringType(e.target.value)}>
          <option value="">All Transaction</option>
          <option value={false}>Exclude Recurring Transaction</option>
          <option value={true}>Only Recurring Transaction</option>
        </Select>
        <InputGroup>
          <InputLeftAddon children='gte' />
          <Input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            placeholder="Start Date"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='lte' />
          <Input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            placeholder="End Date"
          />
        </InputGroup>
      </Stack>
      <TransactionList
        status={filterStatus}
        type={filterType}
        isRecurring={filterRecurringType}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
      />
    </Box>
  );
};

export default Transactions;
