import { FC, lazy } from "react";
import { Route, Routes } from "react-router";

import { Layout } from "./layouts/Layout";
import MainHeader from "./layouts/MainHeader";
import LeftSideBar from "./layouts/LeftSideBar";
import AsideComponent from "./layouts/AsideComponent";
import PageNotFound from "./pages/PageNotFound";
import DashBoard from "./pages/private/dashboard/DashBoardLayout";

const ITAcademy = lazy(() => import("./pages/ITAcademy"));
const ResourcesPage = lazy(() => import("./pages/resources/ResourcesPage"));
const CreateResourcePage = lazy(
  () => import("./pages/resources/CreateResourcePage"),
);

const App: FC = () => {
  return (
    <Layout>
      <MainHeader />
      <LeftSideBar>
        <AsideComponent />
      </LeftSideBar>
      <Routes>
        <Route path="/" element={<ITAcademy />} />
        <Route path="/resources" element={<ResourcesPage />}>
          <Route index element={<ResourcesPage />} />
          <Route path="add" element={<CreateResourcePage />} />
          <Route
            path="*"
            element={
              <PageNotFound label={`Upps! Recurso no encotrado, etc ...`} />
            }
          />
        </Route>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route
          path="*"
          element={<PageNotFound label={`404 - Page Not Found`} />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
