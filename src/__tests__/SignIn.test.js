import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const submitFn = jest.fn();
      const { getByTestId } = render(<SignInContainer submitValues={ submitFn } />);

      fireEvent.changeText(getByTestId('username'), 'matti');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('loginBtn'));

      await waitFor(() => {
        expect(submitFn).toHaveBeenCalledTimes(1);
        expect(submitFn.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password'
        });
      });
    });
  });
});