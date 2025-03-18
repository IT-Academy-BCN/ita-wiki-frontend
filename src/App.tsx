import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./Layout/HeaderComponent";
import AsideComponent from "./Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";

const App: FC = () => {
  return (
    <>
      <HeaderComponent />
      <AsideComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources/:category" element={<ResourcesPage />} />
        <Route path="/resources/add" element={<CreateResourcePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </>
  );
};

export default App;
