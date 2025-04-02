import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./components/Layout/HeaderComponent";
import AsideComponent from "./components/Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";
import { asideContent } from "./components/Layout/header/aside/asideContent";

const App: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderComponent />

      <div className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-hidden">
        <AsideComponent asideContent={asideContent} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources/:category" element={<ResourcesPage />} />
          <Route path="/resources/add" element={<CreateResourcePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
