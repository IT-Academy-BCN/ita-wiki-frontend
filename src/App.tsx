import { FC } from "react";
import { Route, Routes, Navigate } from "react-router";

import HomePage from "./pages/HomePage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HeaderComponent from "./components/Layout/HeaderComponent";
import AsideComponent from "./components/Layout/AsideComponent";
import ResourcesPage from "./pages/ResourcesPage";
import BookmarksPage from "./pages/BookmarksPage";
import MyResourcesPage from "./pages/MyResourcesPage";
import CreateTechnicalTestPage from "./pages/CreateTechnicalTestPage";


import RequireAuth from "./components/RequireAuth";

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
            <Route
              path="/technical-tests/add"
              element={<CreateTechnicalTestPage />}
            />{" "}
            {/* Public route for testing, move to protected routes when it's ready */}
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
