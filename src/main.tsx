import "./assets/css/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import UserCtxProvider from "./context/UserCtxProvider";
import GlobalCtxProvider from "./context/GlobalCtxProvider";
import CustomToaster from "./components/CustomToaster";

const app = createRoot(document.getElementById("root")!);

app.render(
  <StrictMode>
    <GlobalCtxProvider>
      <UserCtxProvider>
        <BrowserRouter>
          <CustomToaster />
          <App />
          <CustomToaster />
        </BrowserRouter>
      </UserCtxProvider>
    </GlobalCtxProvider>
  </StrictMode>,
);
