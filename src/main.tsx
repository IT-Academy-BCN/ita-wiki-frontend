import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserCtxProvider from "./context/UserCtxProvider.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { ResourcesProvider } from "./context/ResourcesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserCtxProvider>
    <StrictMode>
      <BrowserRouter>
        <ResourcesProvider>
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
        </ResourcesProvider>
      </BrowserRouter>
    </StrictMode>
  </UserCtxProvider>
);
