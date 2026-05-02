import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const AppContent = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
