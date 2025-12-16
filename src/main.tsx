import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { ResourcesProvider } from "./context/ResourcesContext.tsx";
import { LikesProvider } from "./context/LikeContext.tsx";
import { TagsProvider } from "./context/TagsContext.tsx";
import { UserProvider } from "./context/UserContext";
import { captureAuthToken } from "./utils/captureAuthToken";

// Capturar token de OAuth antes de montar React
captureAuthToken();

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <StrictMode>
      <BrowserRouter>
        <ResourcesProvider>
          <LikesProvider>
            <TagsProvider>
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
            </TagsProvider>
          </LikesProvider>
        </ResourcesProvider>
      </BrowserRouter>
    </StrictMode>
  </UserProvider>,
);
