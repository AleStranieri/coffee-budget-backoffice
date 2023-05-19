import React, { useState } from 'react';
import { Box, Text, Button, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQuery, gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query GetTransactions($getTransactionsOptions: TransactionOptionsInput) {
    getTransactions(options: $getTransactionsOptions) {
      docs {
        _id
        amount
        name
      }
      totalPages
    }
  }
`;

const Transactions = () => {
  const [page, setPage] = useState(1); // Current page number
  const limit = 10; // Number of transactions per page

  const { loading, error, data, fetchMore } = useQuery(GET_TRANSACTIONS, {
    variables: {
      getTransactionsOptions: {
        page,
        limit,
      },
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const transactions = data.getTransactions.docs;
  const totalPages = data.getTransactions.totalPages;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleLoadPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Transactions
      </Text>
      {transactions.map((transaction) => (
        <Box
          key={transaction._id}
          bg="white"
          shadow="md"
          p={4}
          mb={4}
          borderRadius="md"
        >
          <Text>{transaction.name}</Text>
          <Text>{transaction.amount}</Text>
        </Box>
      ))}
      {totalPages > 1 && (
        <HStack spacing={2} mt={4} justify="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousPage}
            disabled={page === 1}
            aria-label="Previous Page"
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={page === index + 1 ? 'solid' : 'outline'}
              onClick={() => handleLoadPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={handleNextPage}
            disabled={page === totalPages}
            aria-label="Next Page"
          />
        </HStack>
      )}
      {transactions.length === 0 && <Text>No transactions found.</Text>}
    </Box>
  );
};

export default Transactions;
