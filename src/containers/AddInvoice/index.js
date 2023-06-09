// Import necessary components and hooks
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, FormHelperText, Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvoiceContext } from '../../contexts/InvoiceContext';
import { useContext } from 'react';
import { postData } from '../../lib/request';

const AddInvoice = () => {
  const { borrowers, addInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const [invoice, setInvoice] = useState({
    borrower_id: "",
    amount: "",
    due_date: "",
    fees_accrued: 0,
  });

  const handleChange = (event) => {
    setInvoice({
      ...invoice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postData('invoices', invoice);

    if (response.ok) {
      addInvoice(response.data);
      navigate('/');
    } else {
      const errorData = response.data
      setErrors(errorData.error);
    }
  }

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item xs={6}>
      <Typography variant="h4">Add Invoice</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" error={!!errors.borrower}>
          <InputLabel id="borrower-select-label">Borrower</InputLabel>
          <Select
            labelId="borrower-select-label"
            data-testid="borrower_id"
            id="borrower_id"
            value={invoice.borrower_id}
            onChange={handleChange}
            label="Borrower"
            name="borrower_id"
          >
            {borrowers.map((borrower) => (
              <MenuItem key={borrower.id} value={borrower.id}>{borrower.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.borrower}</FormHelperText>
        </FormControl>
        <TextField
          id="number"
          label="Invoice #"
          value={invoice.number}
          onChange={handleChange}
          error={!!errors.number}
          helperText={errors.number}
          name="number"
          type="text"
          fullWidth
          margin="normal"
        />
        <TextField
          id="amount"
          label="Amount"
          value={invoice.amount}
          onChange={handleChange}
          error={!!errors.amount}
          helperText={errors.amount}
          name="amount"
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          id="due_date"
          label="Due Date"
          value={invoice.due_date}
          onChange={handleChange}
          error={!!errors.due_date}
          helperText={errors.due_date}
          name="due_date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="fees_accrued"
          label="Fees Accrued"
          value={invoice.fees_accrued}
          onChange={handleChange}
          error={!!errors.fees_accrued}
          helperText={errors.fees_accrued}
          name="fees_accrued"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      </Grid>
    </Grid>
  );
};

export default AddInvoice;
