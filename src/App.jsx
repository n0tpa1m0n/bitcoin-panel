import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import styles from "./App.module.scss";

function App() {
  return (
    <AppProvider>
      <div className={styles.appContainer}>
        <Header />
        <main className={styles.mainContainer}>
          <Dashboard />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
