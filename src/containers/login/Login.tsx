import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Paper, Typography, Avatar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import TextInput from "components/TextInput";
import GenericDialog from "components/Dialog";
import { logInWithEmailAndPassword, signInWithGoogle } from "services/auth";
import { auth } from "../../firebase";

const defaultStyle = {
  mainDiv: {
    padding: "16px",
    margin: "auto",
    maxWidth: "500px",
    marginTop: "10%",
  },
  avatarDiv: {
    marginLeft: "40%",
    marginBottom: "20px",
  },
  buttonStyle: {
    display: "flex",
    marginTop: "10px",
  },
};

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [openWarningModal, setOpenWarning] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const handleOnclickLogin = () => {
    logInWithEmailAndPassword(
      userDetails.email,
      userDetails.password,
      setOpenWarning
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => setUserDetails({ ...userDetails, [type]: event.target.value });

  return (
    <div style={defaultStyle.mainDiv}>
      <div style={defaultStyle.avatarDiv}>
        <Avatar sx={{ width: 60, height: 60 }}>
          <AccountCircle />
        </Avatar>
      </div>
      <Typography
        variant="h6"
        align="center"
        component="h1"
        style={{ padding: 16 }}
        data-testid="loginPageHeading"
      >
        Login to manage
      </Typography>
      <Paper style={{ padding: 30 }} variant="outlined">
        <TextInput
          width="100%"
          label="Email"
          value={userDetails.email}
          onChange={(event) => handleChange(event, "email")}
        />
        <TextInput
          width="100%"
          label="Password"
          type="password"
          value={userDetails.password}
          onChange={(event) => handleChange(event, "password")}
        />
        <Button
          variant="contained"
          onClick={handleOnclickLogin}
          className="Login-button"
          style={{ width: "100%", marginBottom: 20, marginTop: 20 }}
          data-testid="loginButton"
        >
          Login
        </Button>
        <div style={defaultStyle.buttonStyle}>
          OR
          <Button
            variant="outlined"
            onClick={signInWithGoogle}
            className="Google-Sigin-div"
            style={{ width: "100%", marginLeft: 20 }}
            data-testid="googleLoginButton"
          >
            Sign in With google
          </Button>
        </div>
      </Paper>
      {openWarningModal && (
        <GenericDialog
          open={openWarningModal}
          handleClose={() => setOpenWarning(false)}
          description={`You have logged in with another provider previously. Try "Sign in with google"`}
          primaryButtonText="OK"
        />
      )}
    </div>
  );
};

export default LoginPage;
