import React, {useState, useEffect} from 'react';
import {  
    Box, 
    Text, 
    Button,
    ButtonGroup,
    Select,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaCreditCard } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PAYMENT_ACCOUNTS } from '../graphql/queries';
import Pagination from './Pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PaymentAccountList = () => {
    const [accountTypeFilter, setAccountTypeFilter] = useState('');

    const variables = {
        options: {
        },
      };

    if (accountTypeFilter !== '') {
        variables.where = {
          ...variables.where,
          type: accountTypeFilter,
        };
      }

    const { loading, error, data } = useQuery(GET_PAYMENT_ACCOUNTS, {
        variables
    });
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const { docs: paymentAccounts } = data.getPaymentAccounts;

    const handleEdit = (id) => {
        // Handle edit action
        console.log(id);
      };
    
    const handleDelete = (id) => {
        // Handle delete action
        console.log(id);
    };

    const handleFilterChange = (event) => {
        const { value } = event.target;
        setAccountTypeFilter(value);
    };

  
    return (
        <Box>
            <Select value={accountTypeFilter} onChange={handleFilterChange} mb={4}>
                <option value="">All</option>
                <option value="DEBIT">Debit</option>
                <option value="CREDIT">Credit</option>
            </Select>
          {paymentAccounts.map((paymentAccount) => (
            <Box
              key={paymentAccount._id}
              bg="white"
              shadow="md"
              p={4}
              mb={4}
              borderRadius="md"
              display="flex"
              alignItems="center"
            >
              {paymentAccount.type === 'DEBIT' ? (
                <FaCreditCard size={16} color="blue" style={{ marginRight: '8px' }} />
              ) : (
                <FaCreditCard size={16} color="teal" style={{ marginRight: '8px' }} />
              )}
              <Text>{paymentAccount.name}</Text>
              <ButtonGroup ml="auto">
                <Button
                    as={Link}
                    to={`/payment-accounts/${paymentAccount._id}/edit`}
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<EditIcon />}
                  onClick={() => handleEdit(paymentAccount._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  leftIcon={<DeleteIcon />}
                  onClick={() => handleDelete(paymentAccount._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Box>
          ))}
          {paymentAccounts.length === 0 && <Text>No Payment Accounts found.</Text>}
        </Box>
      );
    };
    
    export default PaymentAccountList;
  