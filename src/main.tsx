import "./assets/css/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import UserCtxProvider from "./context/providers/UserCtxProvider";
import GlobalCtxProvider from "./context/providers/GlobalCtxProvider";
import CustomToaster from "./components/CustomToaster";

import ResourcesCtxProvider from "./context/providers/ResourcesCtxProvider";
const app = createRoot(document.getElementById("root")!);

app.render(
  <StrictMode>
    <GlobalCtxProvider>
      <UserCtxProvider>
        <BrowserRouter>
          <ResourcesCtxProvider>
            <App />
          </ResourcesCtxProvider>
        </BrowserRouter>
        <CustomToaster />
      </UserCtxProvider>
    </GlobalCtxProvider>
  </StrictMode >,
);
