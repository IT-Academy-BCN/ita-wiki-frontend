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
        <Toaster
          richColors
          toastOptions={{
            style: {
              padding: "2rem",
              fontSize: "1rem",
            },
          }}
        />
      </BrowserRouter>
    </StrictMode>
  </UserCtxProvider>,
);
