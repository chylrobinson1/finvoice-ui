import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../../lib/request';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [borrowers, setBorrowers] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(invoice => invoice.id === updatedInvoice.id ? updatedInvoice : invoice));
  };

  const fetchInvoices = async () => {
    const response = await fetchData('invoices');
    if (response.ok) {
      setInvoices(response.data);
    } else {
      console.error("Error fetching invoices:", response.data);
    }
  };

  const fetchBorrowers = async () => {
    const response = await fetchData('borrowers');
    if (response.ok) {
      setBorrowers(response.data);
    } else {
      console.error("Error fetching borrowers:", response.data);
    }
  };

  useEffect(() => {
    fetchBorrowers();
    fetchInvoices();
  }, []);

  return (
    <InvoiceContext.Provider value={{ borrowers, invoices, addInvoice, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};