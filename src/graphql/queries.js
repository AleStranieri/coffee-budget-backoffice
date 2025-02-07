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
  query GetCategories($where: CategoryWhereInput, $options: CategoryOptionsInput) {
    getCategories(where: $where, options: $options) {
      docs {
        _id
        color
        createdAt
        description
        name
        updatedAt
        categoryParent {
          _id
          color
          name
          description
        }
        
      }
      hasNextPage
      hasPrevPage
      nextPage
      prevPage
      totalPages
    }
  }
`;

export const GET_PAYMENT_ACCOUNTS = gql`
  query GetPaymentAccounts($options: PaymentAccountOptionsInput, $where: PaymentAccountWhereInput) {
    getPaymentAccounts(options: $options, where: $where ) {
      docs {
        _id
        name
        description
        nature
        balance
        extra {
          account_name
          account_number
          card_type
          client_name
          closing_balance
          credit_limit
          next_payment_amount
          next_payment_date
          statement_cut_date
          total_payment_amount
          payment_type
        }
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
      nature
      extra
      balance
    }
  }
`;

export const GET_TOTAL_BUDGET = gql`
  query GetTotalBudget($where: PaymentAccountWhereInput) {
    getTotalBudget(where: $where)
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
      category {
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
      recurringTransaction {
        _id
      }
    }
  } 
`;

export const GET_TRANSACTIONS_AMOUNT = gql`
query GetTransactionsAmount(
  $startDate: String!, 
  $endDate: String!, 
  $transactionType: TransactionType!, 
  $transactionStatus: TransactionStatus!
) {
  getTransactionsAmount(
    startDate: $startDate, 
    endDate: $endDate, 
    transactionType: $transactionType, 
    transactionStatus: $transactionStatus
  ) 
}
`;

export const GET_FORECAST = gql`
query GetForecastTransactions(
  $startDate: String!, 
  $endDate: String!, 
  ) {
  getForecastTransactions(
    startDate: $startDate, 
    endDate: $endDate, 
  ) {
    day
    amount
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
      category {
        _id
        color
        name
      }
      userId
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
    totalPages
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
      category {
        _id
        name
      }
      transactions {
        docs {
          _id
          name
          status
          executionDate
        }
      }
    }
  }
`;

