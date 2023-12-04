import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import LoginButton from './LoginButton';
import Profile from './Profile';
import LogoutButton from './LogoutButton';

const Header = () => {
    const pages = [
    { title: 'Home', path: '/' },
    { title: 'Login', path: '/login' },
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
        <Text>
                <LoginButton/>
                <Profile/>
                <LogoutButton />
            </Text>
                
        </Flex>
    </Box>
    );
};

export default Header;