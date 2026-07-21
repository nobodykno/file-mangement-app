import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context.js";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <AuthProvider>
  <App />
  </AuthProvider>
  </BrowserRouter>
);
