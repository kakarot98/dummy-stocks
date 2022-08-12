import React, { useState, useEffect } from "react";
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
import { styled } from '@mui/material/styles';

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

const LogTable = ({transactions, fetchTransactions, setTransactions}) => {
    // useEffect(() => {
    //     if(transactions && transactions.length>0) {
    //         setTransactions(prevTrans => prevTrans.sort((a,b) => a.time.localeCompare(b.time)))
    //     }      
    
    // }, [transactions])
    
    // useEffect(() => {
    //     fetchTransactions()
    //     console.log(transactions)
    // }, [])
    
  return (
    <>
    <TableContainer component={Paper} sx={{marginBottom: "2rem"}}>
        <Table sx={{ minWidth: 650 }} aria-label="log-table">
            <TableHead>
                <TableRow>
                    <StyledHeadCell>Transaction ID</StyledHeadCell>
                    <StyledHeadCell align="center">Transaction Log with Details</StyledHeadCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions && transactions.map((trans) => (
                    <TableRow key={trans.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <StyledBodyCell align="left">{trans.id}</StyledBodyCell>
                        <StyledBodyCell align="center">{trans.log}</StyledBodyCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}

export default LogTable