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

export const GET_PAYMENT_ACCOUNTS = gql`
  query GetPaymentAccounts {
    getPaymentAccounts {
      docs {
        _id
        name
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
        paymentAccount {
          name
        }
      }
      totalPages
    }
  }
`;

// Additional queries...
