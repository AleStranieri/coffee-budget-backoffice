import React, {useState, useEffect} from 'react';
import {  Box, 
          Text, 
          Button,
          useToast,
          Grid,
          GridItem,
          ButtonGroup,
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { EditIcon } from '@chakra-ui/icons';
import { GET_TRANSACTIONS } from '../graphql/queries';
import { DELETE_TRANSACTION } from '../graphql/mutations';
import Pagination from './Pagination';
import CustomDateField from './CustomDateField';
import BadgeTransactionStatus from './BadgeTransactionStatus';
import { Link } from 'react-router-dom';
import ModalItemDelete from './ModalItemDelete';

const TransactionList = ({ 
  pageLimit, 
  status, 
  type, 
  isRecurring, 
  filterStartDate,
  filterEndDate, 
  recurringTransaction 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();

  const variables = {
    options: {
      page: currentPage,
      limit: pageLimit,
      sort: { date: 'desc' },
    },
    where: {},
  };

  if (status !== '') {
    variables.where = {
      ...variables.where,
      status,
    };
  }
  
  if (type !== '') {
    variables.where = {
      ...variables.where,
      type,
    };
  }
  
  if (isRecurring !== '' && isRecurring) {
    variables.where = {
      ...variables.where,
      'isRecurring': isRecurring === 'true',
    };
  }

  if (filterStartDate !== '' && filterStartDate) {
    console.log(filterStartDate);
    variables.where.executionDate = {
      gte: filterStartDate,
    };
  }
  
  if (filterEndDate !== '' && filterEndDate) {
    variables.where.executionDate = {
      ...variables.where.executionDate,
      lte: filterEndDate,
    };
  }

  if (recurringTransaction !== '') {
    variables.where = {
      ...variables.where,
      recurringTransaction
    }
  }

  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS, {
    variables,
  });

  const [deleteTransaction, { deleteLoading, deleteError }] = useMutation(DELETE_TRANSACTION);

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  const handleDelete = (id, e) => {
    e.preventDefault();

    deleteTransaction({
      variables: {
        transactionId: id,
      },
    }) .then((response) => {
      console.log('Transaction deleted:', response.data.deleteTransaction);
      toast({
        title: 'Transaction deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
    })
    .catch((error) => {
      console.error('Transaction deletion error:', error);
    });
  };
  
  return (
    <Box>
      {transactions.map((transaction) => (
        <Box 
          key={transaction._id} 
          bg="white" 
          shadow="md" 
          p={4} 
          mb={4} 
          borderRadius="md"
          borderLeftWidth="10px"
          borderLeftColor={
            transaction.type === 'SPENT' ? 'red.500' :
            transaction.type === 'REVENUE' ? 'green.500' :
            'yellow.500'
          }
          >
            <Grid templateColumns='repeat(3, 1fr)' gap={5}>
              <GridItem w='100%'>
              <Box
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  //noOfLines={1}
                  mb='2'
              >{transaction.name}</Box>
                <Box 
                  display='flex' 
                  alignItems='baseline' 
                  //mt='1'
                  > 
                  <Box
                    color='gray.500'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='xs'
                    textTransform='uppercase'
                    sl='2'
                    mr='2'
                  >
                    <CustomDateField timestamp={transaction.date}/>
                  </Box>
                  <BadgeTransactionStatus status={transaction.status} />
                </Box>
                
              </GridItem>
              <GridItem w='100%'>
                
                  <Box
                    display='flex'
                    alignItems='baseline' 
                  >
                    <Box
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      >Amount: </Box>
                      <Box>
                        {transaction.amount}
                      </Box>
                  </Box>
                  
                <Text>Account: {transaction.paymentAccount.name}</Text>
              </GridItem>
              <GridItem w='100%'>
                <ButtonGroup ml="auto">
                  <Button
                    as={Link}
                    to={`/transactions/${transaction._id}/edit`}
                    colorScheme="teal" 
                    variant="outline"
                    size="sm"
                    leftIcon={<EditIcon />}
                    >Edit</Button>
                    <ModalItemDelete key={transaction._id} itemId={transaction._id} onDelete={handleDelete} />
                </ButtonGroup>
              </GridItem>
            </Grid>
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
