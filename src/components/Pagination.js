import React from 'react';
import { Button, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    onPageChange(page - 1);
  };

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  const handleLoadPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <HStack spacing={2} mt={4} justify="center">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePreviousPage}
        disabled={page === 1}
        aria-label="Previous Page"
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          variant={page === index + 1 ? 'solid' : 'outline'}
          onClick={() => handleLoadPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={handleNextPage}
        disabled={page === totalPages}
        aria-label="Next Page"
      />
    </HStack>
  );
};

export default Pagination;
