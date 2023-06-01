import React from 'react';
import RecurringTransactionFormComponent from '../components/RecurringTransactionFormComponent';

const RecurringTransactionForm = () => {
  // Handle form submission, data fetching, state management, etc.

  const handleSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Transaction Form</h1>
      <RecurringTransactionFormComponent onSubmit={handleSubmit} />
    </div>
  );
};

export default RecurringTransactionForm;
