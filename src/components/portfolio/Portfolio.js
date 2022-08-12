import React, { useEffect, useState } from "react";
import StockTable from "./table/StockTable";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { Typography, Box } from "@mui/material";

function Portfolio() {
  const [stocksList, setStocksList] = useState([]);
  const stockCollectionsRef = collection(db, "stocks");
  const logCollectionsRef = collection(db, "transactions");

  //function to get list of all the stocks bought by the user
  const getStockList = async () => {
    const data = await getDocs(stockCollectionsRef);
    setStocksList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //function where user buys and updates the quantity of the stock
  const buyMore = async (amount, id, qty, price, avg, stock) => {
    console.log(stock);
    console.log(amount, id, qty);
    console.log("buying");

    const stockToBeUpdated = doc(db, "stocks", id);

    const averagePrice =
      Number(avg) + (price - Number(avg)) / (Number(qty) + Number(amount));

    const newField = { qty: Number(qty) + Number(amount), avg: averagePrice };

    await updateDoc(stockToBeUpdated, newField)
      .then(() => getStockList())
      .then(() => window.alert("Amount of stocks has been bought and updated"));

      //add to the transactions log
    await addDoc(logCollectionsRef, {
      log: `Bought ${amount} shares of ${stock.instrument_name} (${stock.symbol}) at LTP ${Number(price).toFixed(2)} and averaged at ${Number(
        averagePrice
      ).toFixed(2)}`,
      time: Date.now()
    })
      .then(() => console.log("added to transaction"))
      .catch((err) => window.alert(err));
      console.log(Date.now())
  };

  //function where user sells and updates the quantity of the stocks
  const sellStocks = async (amount, id, qty, price, avg, stock) => {
    const PandL = Number(avg) - Number(price)
    console.log(stock);
    console.log("selling");
    if (Number(amount) > Number(qty)) {
      window.alert("Cannot sell more than in possession");
    } else if (Number(amount) == Number(qty)) {

      window.alert("Stock would be deleted");
      deleteStock(id);

      console.log(Date.now())

      //add to the transactions log
      await addDoc(logCollectionsRef, {
        log: `Sold all shares of ${stock.instrument_name} (${stock.symbol}) at LTP ${Number(price).toFixed(2)} with P&L of ${Number(PandL).toFixed(2)}`,
        time: Date.now()
      }).then(() => console.log("added to transaction"))
      .catch((err) => window.alert(err));

    } else {
      const stockToBeUpdated = doc(db, "stocks", id);
      const averagePrice = (avg * (Number(qty) - Number(amount)) - price)/(Number(qty) - Number(amount) - 1)
      const newField = {
        qty: Number(qty) - Number(amount),
        avg: averagePrice,
      };
      await updateDoc(stockToBeUpdated, newField)
        .then(() => getStockList())
        .then(() => window.alert("Amount of stocks has been sold and updated"));
        console.log(Date.now())
        //add to the transactions log
        await addDoc(logCollectionsRef, {
          log: `Sold ${amount} shares of ${stock.instrument_name} (${stock.symbol}) at LTP ${Number(price).toFixed(2)} with P&L of ${Number(PandL).toFixed(2)} and averaged at ${Number(averagePrice).toFixed(2)}`,
          time: Date.now()
        }).then(() => console.log("added to transaction"))
        .catch((err) => window.alert(err));
    }
  };

  //function where user sells all stocks and the stock gets deleted
  const deleteStock = async (id) => {
    const stockToBeDeleted = doc(db, "stocks", id);
    await deleteDoc(stockToBeDeleted).then(() => {
      getStockList();
      window.alert(
        "All quantity of the stock has been sold and it has been deleted"
      );
    });
  };

  useEffect(() => {
    getStockList();
  }, []);
  return (
    <div>
      {stocksList && stocksList.length > 0 ? (
        <Box sx={{ padding: "1rem" }}>
          <StockTable
            list={stocksList}
            buyMore={buyMore}
            sellStocks={sellStocks}
          />
        </Box>
      ) : (
        <Box sx={{ padding: "2rem" }}>
          <Typography
            variant="h5"
            sx={{ transform: "translate(40%, 100%)", fontFamily:"monospace" }}
          >
            Fetching your details
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default Portfolio;
