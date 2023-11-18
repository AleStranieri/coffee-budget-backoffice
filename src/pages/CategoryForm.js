import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CategoryFormComponent from '../components/CategoryFormComponent';

const CategoryForm = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Category Form</Text>
      <CategoryFormComponent onSubmit={handleSubmit} />
    </Box>
  );
};

export default CategoryForm;