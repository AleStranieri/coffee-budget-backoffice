import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import PaymentAccountList from '../components/PaymentAccountList';
import { DELETE_PAYMENT_ACCOUNT } from '../graphql/mutations';

const mocks = [
  {
    request: {
      query: DELETE_PAYMENT_ACCOUNT,
      variables: { paymentAccountId: '1' },
    },
    result: () => {
      return {
        data: {
          deletePaymentAccount: {
            _id: '1',
          },
        },
      };
    },
  },
];

test('should delete payment account', async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PaymentAccountList />
    </MockedProvider>
  );

  // Assuming your delete button has a data-testid="delete-button"
  const deleteButton = getByTestId('delete-button');

  fireEvent.click(deleteButton);

  // Wait for the mutation to complete
  await waitFor(() => {
    expect(mockedMutation).toHaveBeenCalled();
  });
});