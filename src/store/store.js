import React, { useState } from "react";

const storedToken = window.localStorage.getItem("token");

const intitialState = {
  token: storedToken ? storedToken : "4",
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [token, setToken] = useState(intitialState);

  return (
    <Context.Provider value={[token, setToken]}>{children}</Context.Provider>
  );
};

export default Store;
