import React, { useState, useEffect } from "react";
import SearchBar from "./search/SearchBar";
import LogTable from "./search/logs/LogTable";
import axios from "axios";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { Box } from "@mui/material";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const logCollectionsRef = collection(db, "transactions");

  const fetchTransactions = async () => {
    await getDocs(logCollectionsRef)
      .then((res) =>{
        setTransactions(
          res.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => b.time - a.time)
        )
        console.log(res.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => a.time - b.time))
          console.log(res)
      }
        
      )
      .catch((err) => window.alert(err));
    //setTransactions(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    //console.log(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          padding: "1rem",
          height: "100vh",
          marginBottom: "3rem",
        }}
      >
        <SearchBar fetchTransactions={fetchTransactions} />

        {transactions && transactions.length > 0 && (
          <LogTable
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            setTransactions={setTransactions}
          />
        )}
      </Box>
    </>
  );
}

export default Home;
