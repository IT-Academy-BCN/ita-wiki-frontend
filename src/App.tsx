import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loading from "./components/Loading";
import { Layout } from "./layouts/Layout";
import MainHeader from "./layouts/MainHeader";
import LeftSideBar from "./layouts/LeftSideBar";
import AsideComponent from "./layouts/AsideComponent";

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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources/:category" element={<ResourcesPage />} />
          <Route path="/resources/add" element={<CreateResourcePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
