import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders Transport link in header', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Transport/i);
  expect(linkElement).toBeInTheDocument();
});