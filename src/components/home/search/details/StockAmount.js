import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

function StockAmount({ open, setAmountOpen, initiateAddStock, handleAmountClose, stockDetails, price }) {
  const [amount, setAmount] = useState(1);

  
  return (
    <>
      <Dialog open={open} onClose={() => handleAmountClose()}>
        <DialogTitle>Amount</DialogTitle>
        <DialogContent>
          Set the amount to be bought:
          <br />
          <br />
          <TextField
            value={amount}
            autoFocus={true}
            type="number"
            variant="standard"
            onChange={e => setAmount(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
            <Button onClick={() => initiateAddStock(stockDetails, amount, price)}>Proceed</Button>
            <Button onClick={() => handleAmountClose()}>Back</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StockAmount;
