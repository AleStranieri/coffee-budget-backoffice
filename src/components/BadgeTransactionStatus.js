import React from 'react';
import { Text, Badge } from '@chakra-ui/react';

const BadgeTransactionStatus = ({ status }) => {
  const statusColor = {
    'EXECUTED': 'teal',
    'PENDING': 'orange',
    'SCHEDULED': 'purple'
  };

    return (
        <Badge borderRadius='full' px='2' colorScheme={statusColor[status]}>
            {status}
        </Badge>)
    ;
};

export default BadgeTransactionStatus;