import React from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
          <Heading size="md" mb={2}>
            Monthly Revenue
          </Heading>
          {/* Add revenue data or component */}
          {/* Example: <Text>$5000</Text> */}
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Heading size="md" mb={2}>
            Monthly Spent
          </Heading>
          {/* Add spent data or component */}
          {/* Example: <Text>$3000</Text> */}
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <Heading size="md" mb={2}>
            Total Budget
          </Heading>
          {/* Add total budget data or component */}
          {/* Example: <Text>$10000</Text> */}
        </Box>
      </SimpleGrid>

      <Box bg="gray.100" p={4} borderRadius="md" mt={8}>
        <Heading size="md" mb={4}>
          Budget Forecast
        </Heading>
        {/* Add budget forecast chart component */}
        {/* Example: <BudgetForecastChart /> */}
      </Box>

    </Box>
  );
};

export default Dashboard;
