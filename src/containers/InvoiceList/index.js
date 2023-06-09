import React, { useContext, useState } from 'react';
import { InvoiceContext } from '../../contexts/InvoiceContext';
import { Typography, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import InvoiceCard from '../../components/InvoiceCard';
import { putData } from '../../lib/request';

function InvoiceList() {
  const { invoices, updateInvoice } = useContext(InvoiceContext);
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState({});

  const handleUpdateStatus = async (id, status) => {
    const response = await putData(`invoices/${id}`, { status });
    const data = response.data;

    if (response.ok) {
      updateInvoice(data);
      setOpen(true);
      setAlertData({
        severity: 'success',
        message: `Successfully ${data.status} the invoice # ${data.number}!`,
      })
    } else {
      setOpen(true);
      setAlertData({
        severity: 'error',
        message: data.error,
      })
    }
  }
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlertData({});
  };

  return (
    <Grid container alignItems='center' direction='column' spacing={2} maxWidth={true}>
      <Grid item xs={12}>
        <Typography variant='h3' marginBottom={1}>Invoices</Typography>
        <Link
          to="invoices/new"
          component="button"
        >
          Create New Invoice
        </Link>

        {invoices.length === 0 && (
          <Typography variant='body2' marginTop={2}>There is no invoices yet.</Typography>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={alertData.severity}
            sx={{ width: '100%' }}
          >
            {alertData.message}
          </MuiAlert>
        </Snackbar>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {invoices.map((invoice) => (
            <Grid item xs={12} md={6} lg={4} key={invoice.id}>
              <InvoiceCard invoice={invoice} handleUpdateStatus={handleUpdateStatus} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InvoiceList;