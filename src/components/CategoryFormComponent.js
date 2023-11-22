import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../graphql/mutations';
import { GET_CATEGORIES } from '../graphql/queries';

const CategoryFormComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryParent, setCategoryParent] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id; // Check if it is edit mode or add mode

  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (isEditMode && !categoryLoading && categoryData) {
      const categoryToUpdate = categoryData.getCategories.find(category => category._id === id);

      if (categoryToUpdate) {
        setName(categoryToUpdate.name);
        setDescription(categoryToUpdate.description);

        // Assuming categoryParent is nullable in the schema
        setCategoryParent(categoryToUpdate.categoryParent ? categoryToUpdate.categoryParent._id : '');
      }
    }
  }, [isEditMode, categoryLoading, categoryData, id]);
  
  const handleCategoryChange = (value) => {
    setCategoryParent(value || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCategoryData = {
      name,
      description,
      categoryParent,
    };

    try {
      if (isEditMode) {
        await updateCategory({
          variables: {
            id: id,
            input: newCategoryData,
          },
        });
      } else {
        await createCategory({
          variables: {
            id: id,
            input: newCategoryData,
          },
        });
      }

      // Redirect to categories page after successful form submission
      navigate('/categories');
    } catch (error) {
      console.error('Error submitting category form:', error);
      // Handle error scenario as needed
    }
  };

//TO-DO: add toast for success and error

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormControl>
        <FormControl id="description" mb={4}>
          <FormLabel>Description</FormLabel>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="categoryParent" mb={4}>
          <FormLabel>Category Parent</FormLabel>
          <Select
            placeholder="Select category parent"
            value={categoryParent || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {!categoryLoading &&
              !categoryError &&
              categoryData.getCategories.docs.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" mr={2}>
          Save
        </Button>
        <Button onClick={() => navigate('/categories')}>Cancel</Button>
      </form>
    </Box>
  );
};

export default CategoryFormComponent;
