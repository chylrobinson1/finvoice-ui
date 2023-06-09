import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AVAILABLE_ACTIONS = {
  created: [
    {action: 'approve', status: 'approved'},
    {action: 'reject', status: 'rejected'},
  ],
  approved: [
    {action: 'purchase', status: 'purchased'},
  ],
  rejected: [],
  purchased: [
    {action: 'close', status: 'closed'},
  ],
}
function InvoiceCard({ invoice, handleUpdateStatus }) {
  const [open, setOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({});
  const handleOpen = (data) => {
    setOpen(true);
    setConfirmData(data);
  };
  const handleConfirm = () => {
    setOpen((prev) => !prev);
    handleUpdateStatus(invoice.id, confirmData.status);
    setConfirmData({});
  }
  const availableActions = AVAILABLE_ACTIONS[invoice.status] || [];
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {invoice.number}
        </Typography>
        <Typography variant="body1">
          Borrower: {invoice.borrower.name}
        </Typography>
        <Typography variant="body1">
          Amount: ${invoice.amount}
        </Typography>
        <Typography variant="body1">
          Due Date: {invoice.due_date}
        </Typography>
        <Typography variant="body1">
          Fees Accrued: ${invoice.fees_accrued}
        </Typography>
        <Typography variant="body1">
          Status: {invoice.status}
        </Typography>
        <Grid container spacing={2}>
          {(availableActions).map(actionData => (
            <Grid item key={actionData.action}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(actionData)}
              >
                {actionData.action}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>Are you sure you want to {confirmData.action} the invoice # {invoice.number}?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default InvoiceCard;