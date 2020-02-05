import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders Transport link in header', () => {
  const { getByText } = render(<Header text="TestHeader" />);
  const linkElement = getByText("TestHeader");
  expect(linkElement).toBeInTheDocument();
});