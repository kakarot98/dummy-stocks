import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  Box,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [error, setError] =  useState(false)
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(userCredential)
            navigate("/home")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(true)
            // ..
          });

    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  );
}

export default Login;
