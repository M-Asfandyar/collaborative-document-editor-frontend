import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

// Mock AuthContext
const mockLogin = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
};

test('renders login form and handles login', async () => {
  const providerProps = {
    login: mockLogin,
  };

  renderWithContext(<Login />, { providerProps });

  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Login/i));

  expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
});
