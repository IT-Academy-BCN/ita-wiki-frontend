import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./components/Layout/HeaderComponent";
import AsideComponent from "./components/Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";

const App: FC = () => {
  return (
    <div className="bg-[#ebebeb] min-h-screen">
      <HeaderComponent />
      <div className="mx-auto w-full grow lg:flex xl:px-2">
        <AsideComponent />
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
