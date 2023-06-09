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

export const UPDATE_PAYMENT_ACCOUNT = gql`
  mutation updatePaymentAccount($updatePaymentAccountId: ID!, $updatePaymentAccountInput: PaymentAccountInput!) {
    updatePaymentAccount(id: $updatePaymentAccountId, input: $updatePaymentAccountInput) {
      _id
      name
    }
  }
`;

export const DELETE_PAYMENT_ACCOUNT = gql`
mutation deletePaymentAccount($paymentAccountId: ID!) {
  deletePaymentAccount(paymentAccountId: $paymentAccountId) {
    _id
  }
}
`;


export const CREATE_RECURRING_TRANSACTION = gql`
  mutation CreateRecurringTransaction($input: RecurringTransactionInput!) {
    createRecurringTransaction(input: $input) {
      _id
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
    }
  }
`;

export const UPDATE_RECURRING_TRANSACTION = gql`
  mutation UpdateRecurringTransaction($id: ID!, $input: RecurringTransactionInput!, $updateExecutedTransactions: Boolean!) {
    updateRecurringTransaction(id: $id, input: $input, updateExecutedTransactions: $updateExecutedTransactions) {
      _id
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

export const DELETE_RECURRING_TRANSACTION = gql`
  mutation DeleteRecurringTransaction($recurringTransactionId: ID!, $deleteExecutedTransactions: Boolean!) {
    deleteRecurringTransaction(recurringTransactionId: $recurringTransactionId, deleteExecutedTransactions: $deleteExecutedTransactions) {
      _id
    }
  }
`;
