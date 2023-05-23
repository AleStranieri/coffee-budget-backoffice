import React from 'react';
import { Text } from '@chakra-ui/react';

const CustomDateField = ({ timestamp }) => {
  const date = new Date(timestamp/1);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  };
  const formattedDate = date.toLocaleString('it-IT', options);

  return <Text>{formattedDate}</Text>;
};

export default CustomDateField;