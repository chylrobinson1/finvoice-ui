import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InvoiceList from './index.js';
import { InvoiceContext } from '../../contexts/InvoiceContext';
import * as request from '../../lib/request';

const mockInvoiceContextValue = {
  invoices: [
    {
      id: 1,
      number: 'INV001',
      borrower: { name: 'John Doe' },
      amount: 100,
      due_date: '2023-06-30',
      fees_accrued: 10,
      status: 'created',
    },
    {
      id: 2,
      number: 'INV002',
      borrower: { name: 'John Doe' },
      amount: 1100,
      due_date: '2023-06-30',
      fees_accrued: 10,
      status: 'rejected',
    },
  ],
  updateInvoice: jest.fn(),
};

const mockPutDataResponse = {
  ok: true,
  data: {
    ...mockInvoiceContextValue.invoices[0],
    status: 'approved',
  },
};

describe('InvoiceList', () => {
  beforeEach(() => {
    jest.spyOn(request, 'putData').mockResolvedValue(mockPutDataResponse);
    render(
      <InvoiceContext.Provider value={mockInvoiceContextValue}>
        <BrowserRouter>
          <InvoiceList />
        </BrowserRouter>
      </InvoiceContext.Provider>
    );
  });

  afterEach(() => {
    // Restore original implementation after each test
    jest.restoreAllMocks();
  });

  test('renders the invoice list', () => {
    const invoiceListHeading = screen.getByRole('heading', { name: /invoices/i });
    expect(invoiceListHeading).toBeInTheDocument();

    const createNewInvoiceLink = screen.getByRole('link', { name: /create new invoice/i });
    expect(createNewInvoiceLink).toBeInTheDocument();

    const invoiceCards = screen.getAllByRole('button', { name: /approve|reject|purchase|close/i });
    expect(invoiceCards.length).toBe(2);
  });

  test('displays a message when there are no invoices', () => {
    // Update InvoiceProvider value to an empty invoices array
    const emptyInvoiceContextValue = {
      ...mockInvoiceContextValue,
      invoices: [],
    };

    render(
      <InvoiceContext.Provider value={emptyInvoiceContextValue}>
        <BrowserRouter>
          <InvoiceList />
        </BrowserRouter>
      </InvoiceContext.Provider>
    );

    const noInvoicesMessage = screen.getByText(/there is no invoices yet/i);
    expect(noInvoicesMessage).toBeInTheDocument();
  });

  test('updates invoice status when an action button is clicked', async () => {
    const approveButton = screen.getByRole('button', { name: /approve/i });

    fireEvent.click(approveButton);

    // Wait for the confirmation dialog to appear
    await waitFor(() => {
      const confirmDialog = screen.getByRole('dialog');
      expect(confirmDialog).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      const approvedText = screen.getByText(/approved/i);
      expect(approvedText).toBeInTheDocument();
    })
  });
});