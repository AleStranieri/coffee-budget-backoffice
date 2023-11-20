import React from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import LineChart from '../components/LineChart';
import { GET_TOTAL_BUDGET, GET_TRANSACTIONS_AMOUNT, GET_FORECAST } from '../graphql/queries';


const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const Dashboard = () => {
  const { loading: loading, error: error, data: data } = useQuery(GET_TOTAL_BUDGET, {
    variables: {
      where: {
        type: "DEBIT"
      },
    }
  });
  const { 
    loading: loadingTransactionsSpent, 
    error: errorTransactionsSpent, 
    data: dataTransactionsSpent 
  } = useQuery(GET_TRANSACTIONS_AMOUNT, {
    variables: {
        "startDate": firstDayOfMonth,
        "endDate": today,
        "transactionType":"SPENT",
        "transactionStatus": "EXECUTED",
    }
  });
  const { 
    loading: loadingTransactionsRevenue, 
    error: errorTransactionsRevenue, 
    data: dataTransactionsRevenue 
  } = useQuery(GET_TRANSACTIONS_AMOUNT, {
    variables: {
        "startDate": firstDayOfMonth,
        "endDate": today,
        "transactionType":"REVENUE",
        "transactionStatus": "EXECUTED",
    }
  });
  const { 
    loading: loadingForecast, 
    error: errorForecast, 
    data: dataForecast 
  } = useQuery(GET_FORECAST, {
    variables: {
      "startDate": firstDayOfMonth,
      "endDate": new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()),
  }
  })

  if (loading || loadingTransactionsSpent || loadingTransactionsRevenue || loadingForecast) return <p>Loading...</p>;
  if (error || errorTransactionsSpent || errorTransactionsRevenue || errorForecast) return <p>Error: {error.message}</p>;

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={4}>
        Welcome to the CoffeeBudget Backoffice Dashboard!
      </Heading>
      <Text>Here, you can manage your coffee budget and transactions.</Text>
      <Flex mt={8}>
        
        <Button as={Link} to="/transactions/create" colorScheme="teal" leftIcon={<AddIcon />} mr={4}>
          New Transaction
        </Button>
        <Button as={Link} to="/payment-accounts/create" colorScheme="teal" leftIcon={<AddIcon />}>
          New Payment Account
        </Button>
      </Flex>
      

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={8}>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> Monthly Revenue</StatLabel>
            <StatNumber>{dataTransactionsRevenue.getTransactionsAmount}</StatNumber>
          </Stat>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>Monthly Spent</StatLabel>
            <StatNumber>{dataTransactionsSpent.getTransactionsAmount}</StatNumber>
          </Stat>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>Total budget</StatLabel>
            <StatNumber>{data.getTotalBudget}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      <Box bg="gray.100" p={4} borderRadius="md" mt={8}>
        <Heading size="md" mb={4}>
          Budget Forecast
        </Heading>
        {/* <LineChart data={dataForecast} /> */}
        {dataForecast.getForecastTransactions[0] ? (
        <LineChart data={dataForecast} />
        ) : (
          <Text>No forecast data available.</Text>
        )}

      </Box>

    </Box>
  );
};

export default Dashboard;
