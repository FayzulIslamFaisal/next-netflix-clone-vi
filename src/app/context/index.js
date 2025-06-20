// GlobalContext.js
"use client";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  useEffect(()=>{
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")))
  },[])
  return (
    <GlobalContext.Provider
      value={{ loggedInAccount, setLoggedInAccount, accounts, setAccounts }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
