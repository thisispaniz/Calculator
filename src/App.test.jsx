import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Helper to click buttons by their text
const clickButton = (text) => {
  fireEvent.click(screen.getByText(text));
};

describe('Calculator App', () => {
  it('renders the calculator', () => {
    render(<App />);
    // Check if some key buttons exist
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('updates display when clicking numbers', () => {
    render(<App />);
    clickButton('1');
    clickButton('2');
    clickButton('3');
    // We look for the display element containing the numbers
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('performs addition correctly', () => {
    render(<App />);
    clickButton('2');
    clickButton('+');
    clickButton('3');
    clickButton('=');
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('performs subtraction correctly', () => {
    render(<App />);
    clickButton('5');
    clickButton('-');
    clickButton('2');
    clickButton('=');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('clears the display when AC is clicked', () => {
    render(<App />);
    clickButton('5');
    clickButton('+');
    clickButton('5');
    clickButton('AC');
    // Should be empty or just not find the numbers anymore
    const display = screen.queryByText('10');
    expect(display).not.toBeInTheDocument();
  });
  
  it('deletes the last digit', () => {
    render(<App />);
    clickButton('1');
    clickButton('2');
    clickButton('DEL');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('12')).not.toBeInTheDocument();
  });
});