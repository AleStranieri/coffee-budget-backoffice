import React from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import LineChart from '../components/LineChart';
import { GET_TOTAL_BUDGET, GET_TRANSACTIONS_AMOUNT, GET_FORECAST } from '../graphql/queries';
import { GET_SALTEDGE_AUTH_URL, SYNC_SALTEDGE_DATA } from '../graphql/mutations';

const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_TOTAL_BUDGET, { variables: { where: { nature: "account" } } });
  const { loading: loadingTransactionsSpent, error: errorTransactionsSpent, data: dataTransactionsSpent } = useQuery(GET_TRANSACTIONS_AMOUNT, { variables: { startDate: firstDayOfMonth, endDate: today, transactionType: "fee", transactionStatus: "posted" } });
  const { loading: loadingTransactionsRevenue, error: errorTransactionsRevenue, data: dataTransactionsRevenue } = useQuery(GET_TRANSACTIONS_AMOUNT, { variables: { startDate: firstDayOfMonth, endDate: today, transactionType: "normal", transactionStatus: "posted" } });
  const { loading: loadingForecast, error: errorForecast, data: dataForecast } = useQuery(GET_FORECAST, { variables: { startDate: firstDayOfMonth, endDate: new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()) } });

  const [getSaltEdgeAuthUrl] = useMutation(GET_SALTEDGE_AUTH_URL);
  const [syncSaltEdgeData] = useMutation(SYNC_SALTEDGE_DATA);

  const handleAddBankConnection = async () => {
    try {
      const response = await getSaltEdgeAuthUrl();
      const { getSaltEdgeAuthUrl: authUrl } = response.data || {};
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error obtaining SaltEdge auth URL:', error);
    }
  };

  const handleSyncData = async () => {
    try {
      await syncSaltEdgeData();
      alert("Data synchronized successfully!");
    } catch (error) {
      console.error('Error synchronizing data:', error);
    }
  };

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
        <Button colorScheme="blue" onClick={handleAddBankConnection}>Add Bank Connection</Button>
        <Button colorScheme="green" onClick={handleSyncData}>Synchronize Data</Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={8}>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>Monthly Revenue</StatLabel>
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
            <StatLabel>Total Budget</StatLabel>
            <StatNumber>{parseFloat(data.getTotalBudget).toFixed(2)}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      <Box bg="gray.100" p={4} borderRadius="md" mt={8}>
        <Heading size="md" mb={4}>Budget Forecast</Heading>
        {dataForecast.getForecastTransactions[0] ? <LineChart data={dataForecast} /> : <Text>No forecast data available.</Text>}
      </Box>
    </Box>
  );
};

export default Dashboard;
