import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const Hello = () => <div>Hello, World!</div>;

test('renders Hello component', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});
