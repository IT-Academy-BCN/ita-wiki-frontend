import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./components/Layout/HeaderComponent";
import AsideComponent from "./components/Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";

const App: FC = () => {

  return (
    <div className="bg-[#ebebeb] p-6 h-screen">
      <HeaderComponent />
      <div className="flex">
        <AsideComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources/:technology" element={<ResourcesPage />} />
          <Route path="/resource/add" element={<CreateResourcePage />} />
        </Routes>
      </div>
    </div>

  );
};

export default App;
