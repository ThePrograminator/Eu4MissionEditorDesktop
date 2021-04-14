import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./containers/Home";
// you need these styles for React Flow to work properly
import "react-flow-renderer/dist/style.css";
// additionally you can load the default theme
import "react-flow-renderer/dist/theme-default.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import Logger from "./components/Logger";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <div style={{ minHeight: "100vh" }}>
        <Home />
      </div>
      <Logger/>
    </ThemeProvider>
  );
}

export default App;
