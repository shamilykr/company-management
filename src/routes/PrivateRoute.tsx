import React, { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import CompanyDetailPage from "pages/CompanyDetailPage";
import CompanyListPage from "pages/CompanyListPage";
import TopBar from "components/TopBar";
import { auth } from "../firebase";
import "../App.css";

import { resetCompanies } from "containers/company-list/companySlice";
const defaultStyle = {
  parentDiv: {
    marginLeft: "50%",
    marginTop: "50%",
  },
};

const PrivateRoute: FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user, loading]);

  const handleLogout = () => {
    dispatch(resetCompanies());
  };

  if (!user)
    return (
      <div style={defaultStyle.parentDiv}>
        <CircularProgress />
      </div>
    );
  return (
    <>
      <TopBar isAuthenticated={true} onLogout={handleLogout} />
      <Routes>
        <Route path="/company/add" element={<CompanyDetailPage />} />
        <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        <Route path="/" element={<CompanyListPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
