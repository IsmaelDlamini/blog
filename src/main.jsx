import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyContextProvider } from "./context/MyContext.jsx";
import 'react-quill/dist/quill.snow.css';
import { initGA } from "./utils/gtag";

const Root = () => {
  useEffect(() => {
    // initialize GA once on app start (GATracker in App will handle page views)
    initGA();
  }, []);

  return (
    <MyContextProvider>
      <App />
    </MyContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
