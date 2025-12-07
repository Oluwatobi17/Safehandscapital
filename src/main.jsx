import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NavContextProvider } from "./context/NavContext";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <NavContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </NavContextProvider>
);
