import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";

import PrivateRoutes from "./PrivateRoute";

const RootLayout: FC = () => (
  <Router>
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <title>React | Login</title>
            <LoginPage />
          </>
        }
      />
      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
  </Router>
);

export default RootLayout;
