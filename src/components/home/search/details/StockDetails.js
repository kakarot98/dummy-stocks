import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import StockAmount from "./StockAmount";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { update, _ } from "lodash";

function StockDetails({ openInfo, setopenInfo, stockInfo, fetchTransactions }) {
  const [price, setPrice] = useState(0);
  const [amountOpen, setAmountOpen] = useState(false);
  const stockCollectionsRef = collection(db, "stocks");

  const logCollectionsRef = collection(db, "transactions")

  //pass onclose dialogbox
  const handleClose = () => {
    setopenInfo(false);
    setPrice(0);
  };

  //close the amount dialog
  const handleAmountClose = () => {
    setAmountOpen(false);
  };

  console.log(stockInfo);

  useEffect(()=>{
    if(stockInfo && stockInfo.symbol){
      fetchPrice()
    }
  }, [stockInfo])

  //function to initiate stock buying
  const initiateAddStock = async (stockDetails, amount, price) => {

    //extract the necessary details only to send to database
    const enteredStock = {
      instrument_name: stockDetails.instrument_name,
      symbol: stockDetails.symbol,
      currency: stockDetails.currency,
      country: stockDetails.country,
      mic_code: stockDetails.mic_code,
    };

    //get the list of stocks to search if it exists already
    const list = await getDocs(stockCollectionsRef).then((data) =>
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(list);


    //return stock if it exists
    let dbElem = list.filter((data) => {
      const { qty, id, avg, ...checkElem } = data;
      return (
        JSON.stringify(checkElem).split("").sort().join("") ===
        JSON.stringify(enteredStock).split("").sort().join("")
      );
    });


    //condition if the stock exists then only update quantity or buy
    if (dbElem.length > 0) {

      let averagePrice = Number(dbElem[0].avg) +  ((price - Number(dbElem[0].avg)) / (Number(dbElem[0].qty) + Number(amount)))

      const stockToBeUpdated = doc(db, "stocks", dbElem[0].id);
      const newField = { qty: Number(dbElem[0].qty) + Number(amount), 
        avg: Number(dbElem[0].avg) +  ((price - Number(dbElem[0].avg)) / (Number(dbElem[0].qty) + Number(amount)))
      };

      await updateDoc(stockToBeUpdated, newField)
        .then(() => setAmountOpen(false))
        .then(() =>
          window.alert("Bought more shares of existing stocks. Check Portfolio")
        )
        .catch(err => window.alert(err));

        //update the list of transaction logs
        await addDoc(logCollectionsRef, {
          log: `Bought ${amount} shares of ${stockDetails.instrument_name} (${stockDetails.symbol}) at LTP ${Number(price).toFixed(2)} and averaged at ${Number(averagePrice).toFixed(2)}`,
          time: Date.now()
        }).then(() => fetchTransactions()).catch(err => window.alert(err))

    } else {
      await addDoc(stockCollectionsRef, {
        qty: Number(amount),
        instrument_name: stockDetails.instrument_name,
        currency: stockDetails.currency,
        country: stockDetails.country,
        symbol: stockDetails.symbol,
        mic_code: stockDetails.mic_code,
        avg: Number(price)
      })
        .then(() => setAmountOpen(false))
        .then(() => window.alert("Check Portfolio for updated list")).catch(err => window.alert(err))
        .catch(err => window.alert(err));
      console.log("need to add");

      //update the list of transaction logs
      await addDoc(logCollectionsRef, {
        log: `Bought ${amount} new shares of ${stockDetails.instrument_name} (${stockDetails.symbol}) at LTP and average of ${Number(price).toFixed(2)}`,
      }).then(() => fetchTransactions()).catch(err => window.alert(err))
    }
  };

  //fetch price of individual stock uing their symbols
  const fetchPrice = async (e) => {
    await axios
      .get(
        `https://api.twelvedata.com/price?symbol=${stockInfo.symbol}&apikey=059937b08f5b4167a0761fddac8c661f`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code && res.data.code == 400) {
          window.alert(res.data.message);
        }
        setPrice(res.data.price);
      })
      .catch((err) => {
        console.log(err);
        setPrice(0);
        window.alert(
          "could not fetch the price for above stock. Try for MAANG companies"
        );
      });
  };
  return (
    <>
      <Dialog open={openInfo} onClose={handleClose}>
        <DialogTitle>Details of {stockInfo.symbol}</DialogTitle>
        <DialogContent>
          Name: {stockInfo.instrument_name} <br />
          Country: {stockInfo.country} Currency: {stockInfo.currency} <br />
          Exchange: {stockInfo.exchange} Exchange_timezone:{" "}
          {stockInfo.exchange_timezone}
          <br />
          Type: {stockInfo.instrument_type}
          <br />
          <br />
          {price > 0 ? <div>Price: {price}</div> : <div></div>}
          <StockAmount
            open={amountOpen}
            setAmountOpen={setAmountOpen}
            initiateAddStock={initiateAddStock}
            handleAmountClose={handleAmountClose}
            stockDetails={stockInfo}
            price={price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => fetchPrice(e)}>Refresh LTP</Button>
          <Button
            onClick={(e) => setAmountOpen(true)}
            disabled={price <= 0 ? true : false}
          >
            Buy
          </Button>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StockDetails;
