import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import GoalProvider from "./context/GoalContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <GoalProvider>

      <App />

    </GoalProvider>

  </React.StrictMode>

);