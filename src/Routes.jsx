import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Login from "pages/login";
import Signup from "pages/signup";
import HomeDashboard from "pages/home-dashboard";
import Library from "pages/library";
import Search from "pages/search";
import Browse from "pages/browse";
import Settings from "pages/settings";
import NotFound from "pages/NotFound";
import Callback from "pages/callback";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
