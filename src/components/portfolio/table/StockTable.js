import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import UpdateStockAmount from "./UpdateStockAmount";
import { styled } from '@mui/material/styles';
//import UpdateStockAmount from "./UpdateStockAmount";

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#a2def2",
  fontFamily: "monospace",
  fontWeight: "700",
  fontSize:"1.2rem"
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f3e5f5",
  fontFamily: "monospace",
  fontSize:"0.9rem"
}));

const StyledBuyButton = styled(TableCell)(({ theme }) => ({
  fontFamily: "monospace",
}));

function StockTable({ list, buyMore, sellStocks }) {
  const [openAmount, setOpenAmount] = useState(false);

  const [id, setId] = useState("");
  const [extra, setExtra] = useState(1);
  const [qty, setQty] = useState(0);
  const [action, setAction] = useState("")
  const [symbol, setSymbol] = useState("")
  const [avg, setAvg] = useState(0)
  const [stock, setStock] = useState({})

  const handleAmountClose = () => {
    setOpenAmount(false);
    setId("");
    setExtra(1);
    setQty(0);
    setAction("")
    setSymbol("")
    setAvg(0)
    setStock({})
  };
  return (
    <>
      <TableContainer component={Paper} sx={{marginBottom: "2rem"}}>
        <Table sx={{ minWidth: 650 }} aria-label="stock-table">
          <TableHead>
            <TableRow>
              <StyledHeadCell align="left">Name and Symbol</StyledHeadCell>
              <StyledHeadCell align="center">Quantity</StyledHeadCell>
              <StyledHeadCell align="center">Average Price</StyledHeadCell>
              <StyledHeadCell align="center">Country</StyledHeadCell>
              <StyledHeadCell align="center">Currency</StyledHeadCell>
              <StyledHeadCell align="right">Actions</StyledHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledBodyCell align="left">
                  {row.instrument_name} ({row.symbol})
                </StyledBodyCell>
                <StyledBodyCell align="center">{row.qty}</StyledBodyCell>
                <StyledBodyCell align="center">${Number(row.avg).toFixed(2)}</StyledBodyCell>
                <StyledBodyCell align="center">{row.country}</StyledBodyCell>
                <StyledBodyCell align="center">{row.currency}</StyledBodyCell>
                <StyledBodyCell  align="right">

                  <Button
                    variant="contained"
                    sx={{fontFamily:"monospace", backgroundColor:"#1976d2", fontWeight:"800"}}
                    onClick={() => {
                        console.log(row.id);
                        setId(row.id);
                        setQty(row.qty);
                        setAction("sell");
                        setOpenAmount(true);
                        setAvg(Number(row.avg).toFixed(2))
                        setSymbol(row.symbol)
                        setStock(row)
                    }}
                  >
                    Sell
                  </Button>

                  <Button
                    variant="text"
                    color="primary"
                    sx={{fontFamily:"monospace", fontWeight:"800"}}
                    onClick={() => {
                      setId(row.id);
                      setQty(row.qty);
                      setAction("buy")
                      setSymbol(row.symbol)
                      setOpenAmount(true);
                      setAvg(Number(row.avg).toFixed(2))
                      setStock(row)
                    }}
                  >
                    Buy More
                  </Button>
                </StyledBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* dialog box to enter the extra amount of stocks you want to buy or if you want to sell*/}
      <UpdateStockAmount
            id={id}
            extra={extra}
            qty={qty}
            openAmount={openAmount}
            handleAmountClose={handleAmountClose}
            buyMore={buyMore}
            sellStocks={sellStocks}
            action={action}
            symbol={symbol}
            avg={avg}
            stock={stock}
          />
    </>
  );
}

export default StockTable;
