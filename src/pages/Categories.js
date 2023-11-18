import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import CategoriesList from '../components/CategoriesList';

const Categories = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Categories
      </Text>
      <Button as={Link} to="/categories/create" colorScheme="teal" leftIcon={<AddIcon />}>
        New Category
      </Button>
      <Box>
        <CategoriesList />
      </Box>
    </Box>
  );
};

export default Categories;