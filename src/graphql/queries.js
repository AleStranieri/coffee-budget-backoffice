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

export const GET_ENUM_TRANSACTIONFREQTYPE = gql`
  query GetEnumTransactionFreqType {
    __type(name: "TransactionRecurringFrequencyType") {
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

export const GET_PAYMENT_ACCOUNT = gql`
  query GetPaymentAccount($paymentAccountId: ID!) {
    getPaymentAccount(paymentAccountId: $paymentAccountId) {
      _id
      name
      description
      type
      ... on DebitAccount {
        _id
        amount
        description
        name
      }
      ... on CreditCardAccount {
        _id
        description
        executionDate
        name
        spendingLimit
        accountParent {
          ... on DebitAccount {
            _id
          }
        }
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
      }
      status
      type
      executionDate
      index
    }
  } 
`;

export const GET_RECURRING_TRANSACTIONS = gql`
query GetRecurringTransactions($where: TransactionWhereInput, $options: TransactionOptionsInput) {
  getRecurringTransactions(where: $where, options: $options) {
    docs {
      _id
      amount
      name
      categories {
        _id
        name
      }
      creator {
        _id
        email
      }
      createdAt
      description
      end_date
      frequency_every_n
      frequency_type
      occurrences
      paymentAccount {
        _id
        name
      }
      start_date
      status
      type
      updatedAt
    }
  }
}
`;

export const GET_RECURRING_TRANSACTION = gql`
  query GetRecurringTransaction($recurringTransactionId: ID!) {
    getRecurringTransaction(recurringTransactionId: $recurringTransactionId) {
      name
      description
      amount
      status
      type
      frequency_every_n
      frequency_type
      occurrences
      start_date
      end_date
      paymentAccount {
        _id
        name
      }
      categories {
        _id
        name
      }
    }
  }
`;

