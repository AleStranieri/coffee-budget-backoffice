import { gql } from '@apollo/client';

export const GET_ENUM_TRANSACTIONTYPE = gql`
  query GetEnumTransactionType {
    __type(name: "TransactionType") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_TRANSACTIONSTATUS = gql`
  query GetEnumTransactionStatus {
    __type(name: "TransactionStatus") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      docs {
        _id
        name
      }
    }
  }
`;

export const GET_PAYMENT_ACCOUNTS = gql`
  query GetPaymentAccounts($options: PaymentAccountOptionsInput, $where: PaymentAccountWhereInput) {
    getPaymentAccounts(options: $options, where: $where ) {
      docs {
        _id
        name
        type
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($options: TransactionOptionsInput, $where: TransactionWhereInput) {
    getTransactions(options: $options, where: $where ) {
      docs {
        _id
        amount
        name
        date
        status
        type
        paymentAccount {
          name
        }
      }
      totalPages
    }
  }
`;

export const GET_TRANSACTION = gql`
query GetTransaction($transactionId: ID!) {
    getTransaction(transactionId: $transactionId) {
      _id
      amount
      categories {
        _id
        name
      }
      date
      description
      name
      paymentAccount {
        _id
        name
        type
        ... on DebitAccount {
          _id
          amount
          name
          type
        }
        ... on CreditCardAccount {
          _id
          name
          accountParent {
            ... on CreditCardAccount {
              accountParent {
                _id
                name
              }
              name
              spendingLimit
            }
          }
        }
      }
      status
      type
      executionDate
      index
    }
  } 
`;

// Additional queries...
