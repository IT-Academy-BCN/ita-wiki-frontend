import { FC, lazy } from "react";
import { Route, Routes } from "react-router";
import MainHeader from "./Layout/MainHeader";
import AsideComponent from "./Layout/AsideComponent";
import { Layout } from "./Layout/Layout";
import LeftSideBar from "./Layout/LeftSideBar";

const HomePage = lazy(() => import("./pages/HomePage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const CreateResourcePage = lazy(() => import("./pages/CreateResourcePage"));

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
