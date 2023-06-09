import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './containers/InvoiceList';
import AddInvoice from './containers/AddInvoice';
import { InvoiceProvider } from './contexts/InvoiceContext';

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <Routes>
          <Route path="/invoices/new" element={<AddInvoice />} />
          <Route path="/" element={<InvoiceList />} />
        </Routes>
      </Router>
    </InvoiceProvider>
  );
}

export default App;