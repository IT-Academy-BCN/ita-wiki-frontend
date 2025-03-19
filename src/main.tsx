import "./assets/css/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import UserCtxProvider from "./context/UserCtxProvider.tsx";
import GlobalCtxProvider from "./context/GlobalCtxProvider.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <GlobalCtxProvider>
    <UserCtxProvider>
      <StrictMode>
        <BrowserRouter>
          <Toaster
            richColors
            toastOptions={{
              style: {
                padding: "2rem",
                fontSize: "1rem",
              },
            }}
          />
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
    </UserCtxProvider>
  </GlobalCtxProvider>,
);
