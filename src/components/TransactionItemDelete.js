import React, { useState } from 'react';
import {  Box, 
  Text, 
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';


const TransactionItemDelete = ({ transaction, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
  
    const handleDelete = (e) => {
      onDelete(transaction._id , e);
      onClose();
    };
  
    return (
      <Box>
        <Button 
          variant="outline"
          colorScheme='red' 
          size="sm"
          leftIcon={<DeleteIcon />}
          onClick={onOpen}>
          Delete Transaction
        </Button>

      <AlertDialog
        id={transaction._id}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete {transaction._id}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
    );
  };

  export default TransactionItemDelete;

          