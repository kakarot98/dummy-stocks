import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from 'axios'

function UpdateStockAmount({
  openAmount,
  handleAmountClose,
  id,
  qty,
  extra,
  action,
  sellStocks,
  buyMore,
  symbol,
  avg,
  stock
}) {
  const [amount, setAmount] = useState(1);
  const [latestPrice, setLatestPrice] = useState(0)

  useEffect(() => {
    if (symbol) {
      fetchPrice()
    }
  },[symbol])

  const fetchPrice = async () => {
    await axios
      .get(
        `https://api.twelvedata.com/price?symbol=${symbol}&apikey=059937b08f5b4167a0761fddac8c661f`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code && res.data.code == 400) {
          window.alert(res.data.message);
        }
        setLatestPrice(res.data.price);
      })
      .catch((err) => {
        console.log(err);
        setLatestPrice(0);
        window.alert(
          "could not fetch the price for above stock. Try for MAANG companies"
        );
      });
  };

  return (
    <Dialog open={openAmount} onClose={() => {handleAmountClose(); setAmount(1); setLatestPrice(0)}}>
      <DialogTitle>Quantity</DialogTitle>
      <DialogContent>
      {latestPrice > 0 ? <div>The Last Traded Price for this commodity is {latestPrice}</div> : <div></div>}
        <br />
        Add quantity:
        <br />
        <br />
        <TextField
          value={amount}
          autoFocus={true}
          type="number"
          variant="standard"
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
      <Button onClick={(e) => fetchPrice()}>Refresh LTP</Button>
        <Button
        disabled={latestPrice <= 0 ? true : false}
          onClick={() => {
            action == "buy" ? buyMore(amount, id, qty, latestPrice, avg, stock): (action == "sell" ? sellStocks(amount, id, qty, latestPrice, avg, stock): window.alert("Cannot accept this action"))
            console.log(amount, id, qty, latestPrice);
            handleAmountClose();
            setAmount(1);
            setLatestPrice(0)
          }}
        >
          Proceed
        </Button>
        <Button
          onClick={() => {
            handleAmountClose();
            setAmount(1);
          }}
        >
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateStockAmount;
