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
  // blog post content

  const [blogPostContent, setBlogPostContent] = useState();

  const contextvalues = { blogPostContent, setBlogPostContent };

  return (
    <MyContext.Provider value={contextvalues}>{children}</MyContext.Provider>
  );
};
