import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InvoiceCard from './index.js';

const theme = createTheme();

describe("InvoiceCard component", () => {
  const mockHandleUpdateStatus = jest.fn();
  const mockInvoice = {
    id: '1',
    number: 'INV001',
    borrower: {
      name: 'Borrower1',
    },
    amount: '500.00',
    due_date: '2022-12-31',
    fees_accrued: '0.00',
    status: 'created',
  };

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <InvoiceCard invoice={mockInvoice} handleUpdateStatus={mockHandleUpdateStatus} />
      </ThemeProvider>
    );
  });

  test("renders correctly", () => {
    expect(screen.getByText(/INV001/i)).toBeInTheDocument();
    expect(screen.getByText(/Borrower: Borrower1/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount: \$500.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Due Date: 2022-12-31/i)).toBeInTheDocument();
    expect(screen.getByText(/Fees Accrued: \$0.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: created/i)).toBeInTheDocument();
  });

  test('clicking the approve button triggers the correct function', async () => {
  
    const button = screen.getByRole('button', { name: /approve/i });
    userEvent.click(button);

    const confirmButton = await screen.getByRole('button', { name: /confirm/i });
    userEvent.click(confirmButton);
  
    expect(mockHandleUpdateStatus).toHaveBeenCalledWith(mockInvoice.id, 'approved');
  });
  
  test('clicking the reject button triggers the correct function', async () => {
  
    const button = screen.getByRole('button', { name: /reject/i });
    userEvent.click(button);
    const confirmButton = await screen.getByRole('button', { name: /confirm/i });
    userEvent.click(confirmButton);
  
    expect(mockHandleUpdateStatus).toHaveBeenCalledWith(mockInvoice.id, 'rejected');
  });
});