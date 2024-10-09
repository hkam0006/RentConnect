import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@mui/x-charts/BarChart', () => ({
  BarChart: () => null, // Return a simple functional component that renders nothing
}));

test('renders app without crashing', () => {
  render(<App />)
});
