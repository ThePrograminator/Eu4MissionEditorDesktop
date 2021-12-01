import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./containers/Home";
// you need these styles for React Flow to work properly
import "react-flow-renderer/dist/style.css";
// additionally you can load the default theme
import "react-flow-renderer/dist/theme-default.css";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import Logger from "./components/Logger";

import MissionTreeContextProvider from "./contexts/MissionTreeContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";

const themesList = [lightTheme, darkTheme];

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themesList[1]);
  return (
    <SettingsContextProvider>
      <MissionTreeContextProvider>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyles />
          <div style={{ minHeight: "100vh" }}>
            <Home
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
              themesList={themesList}
            />
          </div>
          <Logger />
        </ThemeProvider>
      </MissionTreeContextProvider>
    </SettingsContextProvider>
  );
};

export default App;
