import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import '@testing-library/jest-dom'; // Fixes "Invalid Chai property" error

// Helper: Specifically find a BUTTON with the text, not just any text
const clickButton = (text) => {
  const button = screen.getByRole('button', { name: text });
  fireEvent.click(button);
};

describe('Calculator App', () => {
  it('renders the calculator', () => {
    render(<App />);
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('updates display when clicking numbers', () => {
    render(<App />);
    clickButton('1');
    clickButton('2');
    clickButton('3');
    // Look specifically at the display, not the buttons
    expect(screen.getByTestId('display')).toHaveTextContent('123');
  });

  it('performs addition correctly', () => {
    render(<App />);
    clickButton('2');
    clickButton('+');
    clickButton('3');
    clickButton('=');
    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  it('performs subtraction correctly', () => {
    render(<App />);
    clickButton('5');
    clickButton('-');
    clickButton('2');
    clickButton('=');
    expect(screen.getByTestId('display')).toHaveTextContent('3');
  });

  it('clears the display when AC is clicked', () => {
    render(<App />);
    clickButton('5');
    clickButton('+');
    clickButton('5');
    clickButton('AC');
    // Expect display to be empty
    expect(screen.getByTestId('display')).toHaveTextContent('');
  });
  
  it('deletes the last digit', () => {
    render(<App />);
    clickButton('1');
    clickButton('2');
    clickButton('DEL');
    expect(screen.getByTestId('display')).toHaveTextContent('1');
  });
});