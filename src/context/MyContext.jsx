import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider = ({ children }) => {
  const [userDataGlobalValue, setUserDataGlobalValue] = useState();
  const [extraPostDetails, setExtraPostDetails] = useState({});

  const contextvalues = {
    userDataGlobalValue,
    setUserDataGlobalValue,
    extraPostDetails,
    setExtraPostDetails,
  };

  return (
    <MyContext.Provider value={contextvalues}>{children}</MyContext.Provider>
  );
};
