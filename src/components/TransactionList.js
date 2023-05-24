import React, {useState} from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries';
import Pagination from './Pagination';
import CustomDateField from './CustomDateField';
import BadgeTransactionStatus from './BadgeTransactionStatus';

const TransactionList = ({ page, pageLimit, onPageChange, status }) => {
    const [currentPage, setCurrentPage] = useState(1); 
  
    const variables = {
      options: {
        page: currentPage,
        limit: pageLimit,
        sort: { date: 'desc' },
      },
    };
  
    if (status) {
      variables.where = {
        status,
      };
    }
  
    const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
      variables,
    });
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { docs: transactions, totalPages } = data.getTransactions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      {transactions.map((transaction) => (
        <Box key={transaction._id} bg="white" shadow="md" p={4} mb={4} borderRadius="md">
          <Box display='flex' alignItems='baseline'> 
            <BadgeTransactionStatus status={transaction.status} />
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              <CustomDateField timestamp={transaction.date}/>
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >{transaction.name}</Box>
          <Text>{transaction.amount}</Text>
          
          {/* Display other transaction details */}
        </Box>
      ))}
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {transactions.length === 0 && <Text>No transactions found.</Text>}
    </Box>
  );
};

export default TransactionList;
