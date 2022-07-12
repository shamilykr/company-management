import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import RootLayout from "./routes/RootLayout";
import { Provider } from "react-redux";
import store from "./store/index";
import { theme } from "utils/themes";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootLayout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
