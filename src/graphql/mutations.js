import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      _id
      amount
      description
      name
      date
      type
      status
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($updateTransactionId: ID!, $input: TransactionInput!) {
    updateTransaction(id: $updateTransactionId, input: $input) {
      _id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($transactionId: ID!) {
  deleteTransaction(transactionId: $transactionId) {
    _id
  }
}
`;


// Mutation for creating a debit payment account
export const CREATE_DEBIT_PAYMENT_ACCOUNT = gql`
  mutation CreateDebitPaymentAccount($name: String!, $description: String, $amount: Float!) {
    createDebitPaymentAccount(name: $name, description: $description, amount: $amount) {
      ... on DebitAccount {
        _id
        amount
        description
        name
      }
    }
  }
`;

// Mutation for creating a credit payment account
export const CREATE_CREDIT_PAYMENT_ACCOUNT = gql`
  mutation CreateCreditPaymentAccount(
    $name: String!
    $description: String
    $spendingLimit: Float!
    $executionDate: String!
    $accountParent: ID!
  ) {
    createCreditPaymentAccount(
      name: $name
      description: $description
      spendingLimit: $spendingLimit
      executionDate: $executionDate
      accountParent: $accountParent
    ) {
      ... on CreditCardAccount {
        _id
        description
        executionDate
        name
        spendingLimit
      }
    }
  }
`;

