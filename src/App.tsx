import { FC } from "react";
import { Route, Routes, Navigate } from "react-router";

import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./components/Layout/HeaderComponent";
import AsideComponent from "./components/Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";
import BookmarksPage from "./pages/BookmarksPage";
import MyResourcesPage from "./pages/MyResourcesPage";
import TechnicalTestCreatePage from "./pages/TechnicalTestCreatePage";
import MyTechnicalTestsPage from "./pages/MyTechnicalTestsPage";
import RequireAuth from "./components/RequireAuth";
import CodeConnectPage from "./pages/CodeConnectPage";

const App: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />

      <div className="flex flex-col lg:flex-row lg:flex-grow">
        <AsideComponent />
        <div className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/resources/:category" element={<ResourcesPage />} />
            
            <Route path="/codeconnect" element={<CodeConnectPage />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/resources/bookmarks" element={<BookmarksPage />} />
              <Route
                path="/resources/my-resources"
                element={<MyResourcesPage />}
              />
              <Route path="/resources/add" element={<CreateResourcePage />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route
              path="/resources/technical-test/create"
              element={<TechnicalTestCreatePage />}
            />

            <Route
              path="/resources/technical-test/all-tech-tests"
              element={<MyTechnicalTestsPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
