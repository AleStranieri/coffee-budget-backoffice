import React from 'react';
import { Button, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ page, totalPages, onPageChange, siblingCount = 1 }) => {
  const handlePreviousPage = () => {
    onPageChange(page - 1);
  };

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  const handleLoadPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  // Calculate the pagination range
  const rangeStart = Math.max(2, page - siblingCount);
  const rangeEnd = Math.min(totalPages - 1, page + siblingCount);

  return (
    <HStack spacing={2} mt={4} justify="center">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePreviousPage}
        disabled={page === 1}
        aria-label="Previous Page"
      />
      <Button
        variant={page === 1 ? 'solid' : 'outline'}
        onClick={() => handleLoadPage(1)}
      >
        1
      </Button>
      {rangeStart > 2 && <Button isDisabled>...</Button>}
      {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => {
        const pageNumber = rangeStart + index;
        return (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? 'solid' : 'outline'}
            onClick={() => handleLoadPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      {rangeEnd < totalPages - 1 && <Button isDisabled>...</Button>}
      <Button
        variant={page === totalPages ? 'solid' : 'outline'}
        onClick={() => handleLoadPage(totalPages)}
      >
        {totalPages}
      </Button>
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