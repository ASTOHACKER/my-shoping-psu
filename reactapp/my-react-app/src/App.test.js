import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main navigation', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: 'หน้าแรก' });
  expect(linkElement).toBeTruthy();
});
