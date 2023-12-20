import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Stack } from '@chakra-ui/react';
import AuthButton from './AuthButton';

const Header = () => {
    const pages = [
    { title: 'Home', path: '/' },
    { title: 'Transactions', path: '/transactions' },
    { title: 'Recurring', path: '/recurring-transactions' },
    { title: 'Payment Accounts', path: '/payment-accounts' },
    { title: 'Categories', path: '/categories' },
    // Add more pages as needed
    ];

    return (
    <Box bg="gray.200" py={4}>
        <Flex maxW="container.lg" mx="auto" justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">CoffeeBudget</Text>
            <Flex as="nav">
                {pages.map((page, index) => (
                <Text key={index} ml={index !== 0 && 4} fontSize="md" fontWeight="medium">
                    <Link to={page.path}>{page.title}</Link>
                </Text>
                ))}
                
            </Flex>
            <Stack direction='row'>
                <AuthButton/>  
            </Stack>
        </Flex>
    </Box>
    );
};

export default Header;