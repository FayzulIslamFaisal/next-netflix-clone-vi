// GlobalContext.js
"use client";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const [searchResults, setSearchResults ] = useState([]);
  const [currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType ] = useState(null);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(()=>{
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")))
  },[])
  return (
    <GlobalContext.Provider
      value={
        { 
          loggedInAccount, 
          setLoggedInAccount,
          accounts,
          setAccounts,
          mediaData,
          setMediaData,
          searchResults,
          setSearchResults,
          currentMediaInfoIdAndType,
          setCurrentMediaInfoIdAndType,   
          mediaDetails,
          setMediaDetails,
          similarMovies,
          setSimilarMovies
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};
