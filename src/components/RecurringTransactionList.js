import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Checkbox,
  useToast,
  Grid,
  GridItem,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RECURRING_TRANSACTIONS, GET_RECURRING_TRANSACTION } from '../graphql/queries';
import { DELETE_RECURRING_TRANSACTION } from '../graphql/mutations';
import Pagination from './Pagination';
import CustomDateField from './CustomDateField';
import BadgeTransactionStatus from './BadgeTransactionStatus';
import { Link } from 'react-router-dom';

const RecurringTransactionList = ({
  page,
  pageLimit,
  onPageChange,
  status,
  type,
  isRecurring,
  filterStartDate,
  filterEndDate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [deleteExecutedTransactions, setDeleteExecutedTransactions] = useState(false);
  const [hasExecutedTransactions, setHasExecutedTransactions] = useState([]);


  const variables = {
    options: {
      // page: currentPage,
      // limit: pageLimit,
      sort: { name: 'desc' },
    },
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

  const { loading, error, data, refetch } = useQuery(GET_RECURRING_TRANSACTIONS, {
    variables,
  });

  const { loading: recurringTransactionLoading, error: recurringTransactionError, data: recurringTransactionData, refetch: recurringTransactionRefetch } = useQuery(GET_RECURRING_TRANSACTION, {
    variables: {
      recurringTransactionId: selectedTransactionId,
    },
    skip: !selectedTransactionId,
  });
  

  const [deleteRecurringTransaction, { loading: deleteLoading, error: deleteError }] = useMutation(
    DELETE_RECURRING_TRANSACTION, {
      refetchQueries: [{ query: GET_RECURRING_TRANSACTIONS }],
    }
  );

  useEffect(() => {
    //refetch();

    const deleteTransaction = async () => {
      try {
        if (recurringTransactionData) {
          // Retrieve the recurring transaction using the transactionId
          const recurringTransaction = recurringTransactionData.getRecurringTransaction;
  
          // Check if there are executed transactions associated with the recurring transaction
          const executedTransactions = recurringTransaction.transactions.docs.filter(
            (transaction) => transaction.status === 'EXECUTED'
          );

          console.log(executedTransactions);
  
          if (executedTransactions.length > 0) {
            // If there are executed transactions, set them to hasExecutedTransactions
            setHasExecutedTransactions(executedTransactions);
          } 
          setShowConfirmation(true);
        } else {
          // If recurringTransactionData is not available, refetch the query to fetch the recurring transaction
          await recurringTransactionRefetch();
        }
      } catch (error) {
        console.error('Error retrieving recurring transaction:', error);
      }
    };

    if (recurringTransactionData) {
      deleteTransaction();
    }

  }, [refetch, recurringTransactionData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (transactionId) => {
    setSelectedTransactionId(transactionId);
  };
  
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedTransactionId(null);
    setDeleteExecutedTransactions(false);
    setHasExecutedTransactions([]);
  };

  const handleConfirmationConfirm = async () => {
    try {
      handleConfirmationClose();
      // Delete the recurring transaction
      const response = await deleteRecurringTransaction({
        variables: {
          recurringTransactionId: selectedTransactionId,
          deleteExecutedTransactions: deleteExecutedTransactions,
        },
      });
      console.log('Transaction deleted:', response.data.deleteRecurringTransaction);
      toast({
        title: 'Transaction deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      console.error('Transaction deletion error:', error);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { docs: transactions, totalPages } = data.getRecurringTransactions;

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
            transaction.type === 'SPENT'
              ? 'red.500'
              : transaction.type === 'REVENUE'
              ? 'green.500'
              : 'yellow.500'
          }
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%">
              <Box fontWeight="semibold" as="h4" lineHeight="tight" mb="2">
                {transaction.name}
              </Box>
              <Box display="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  sl="2"
                  mr="2"
                >
                  <CustomDateField timestamp={transaction.start_date} />
                </Box>
                <BadgeTransactionStatus status={transaction.status} />
              </Box>
              <Box>
                <Text>
                  Frequency: {transaction.frequency_every_n} {transaction.frequency_type}
                </Text>
              </Box>
            </GridItem>
            <GridItem w="100%">
              <Box display="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  Amount:
                </Box>
                <Box ml="1">{transaction.amount}</Box>
              </Box>
              <Text>Account: {transaction.paymentAccount.name}</Text>
              <Box>
                <Text>Occurrences: {transaction.occurrences}</Text>
              </Box>
            </GridItem>
            <GridItem w="100%">
              <ButtonGroup ml="auto">
                <Button
                  as={Link}
                  to={`/recurring-transactions/${transaction._id}/edit`}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </Box>
      ))}
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      {transactions.length === 0 && <Text>No transactions found.</Text>}

      <AlertDialog
        isOpen={showConfirmation}
        leastDestructiveRef={null}
        onClose={handleConfirmationClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              {hasExecutedTransactions.length > 0 && (
                <Checkbox
                  isChecked={deleteExecutedTransactions}
                  onChange={(e) => setDeleteExecutedTransactions(e.target.checked)}
                  colorScheme="red"
                  mb={2}
                >
                  Delete {hasExecutedTransactions.length} executed transaction/s associated with this recurring transaction
                </Checkbox>
              )}
              Are you sure you want to delete this recurring transaction? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleConfirmationClose}>Cancel</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmationConfirm}
                isLoading={deleteLoading}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default RecurringTransactionList;
