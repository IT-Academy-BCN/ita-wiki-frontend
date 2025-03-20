import { FC } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import MainHeader from "./Layout/MainHeader";
import AsideComponent from "./Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";
import { Layout } from "./Layout/Layout";
import LeftSideBar from "./Layout/LeftSideBar";

const App: FC = () => {
  return (
    <Layout>
      <MainHeader />
      <LeftSideBar>
        <AsideComponent />
      </LeftSideBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources/:category" element={<ResourcesPage />} />
        <Route path="/resources/add" element={<CreateResourcePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
