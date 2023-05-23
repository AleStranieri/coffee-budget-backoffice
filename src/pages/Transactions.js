import React, { useState } from 'react';
import { Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TransactionList from '../components/TransactionList';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Transactions
      </Text>
      <Tabs isLazy defaultIndex={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>All Transactions</Tab>
          <Tab>Completed</Tab>
          <Tab>Pending</Tab>
          <Tab>Scheduled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TransactionList status={null} />
          </TabPanel>
          <TabPanel>
            <TransactionList status="EXECUTED" />
          </TabPanel>
          <TabPanel>
            <TransactionList status="PENDING" />
          </TabPanel>
          <TabPanel>
            <TransactionList status="SCHEDULED" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Transactions;
