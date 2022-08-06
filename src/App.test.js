import { render, screen } from '@testing-library/react';
import App from './App';

test('App component should contain Category links such as Electronics', () => {
  render(<App />);
  console.log(screen.debug())
  const linkElement = screen.getByText(/Electronics/);
  expect(linkElement).toBeInTheDocument();
});
