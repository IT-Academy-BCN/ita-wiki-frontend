import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserCtxProvider from "./context/UserCtxProvider.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <UserCtxProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StrictMode>
  </UserCtxProvider>,
);
