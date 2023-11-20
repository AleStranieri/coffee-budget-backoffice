import React, { useState } from 'react';
import { Box, Button, useToast, Text, Link, HStack, VStack, Spacer, ButtonGroup } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../graphql/queries';
import { DELETE_CATEGORY } from '../graphql/mutations';
import { Link as RouterLink } from 'react-router-dom';

const CategoriesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, {
    variables: { options: { page: currentPage, limit: 10 } }, // Set limit as per your requirement
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = (id) => {
    deleteCategory({ variables: { categoryId: id } })
      .then(() => {
        toast({ title: 'Category deleted', status: 'success', duration: 3000, isClosable: true });
        refetch();
      })
      .catch((error) => {
        console.error('Category deletion error:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      {data.getCategories.docs.map((category) => (
        <Box key={category._id} p={5} shadow="md" borderWidth="1px">
          <HStack spacing="24px">
            <VStack align="start">
              <Text fontWeight="bold">{category.name}</Text>
              {category.categoryParent && <Text fontSize="sm">Parent Category: {category.categoryParent.name}</Text>}
            </VStack>
            <Spacer />
            <ButtonGroup variant="outline" spacing="6">
              <Button as={RouterLink} to={`/categories/${category._id}/edit`} leftIcon={<EditIcon />}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(category._id)} colorScheme="red" leftIcon={<DeleteIcon />}>
                Delete
              </Button>
            </ButtonGroup>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriesList;