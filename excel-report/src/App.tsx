import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MeatSteamGrindingExportButton from "./components/ExportButton";

const meatSteamGrindingExportData = [
  { date: "2024-06-01" },
  { date: "2024-06-02" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Excel Export Example with Meat Steam Grinding Data</p>
        <MeatSteamGrindingExportButton
          meatSteamGrindingExportData={meatSteamGrindingExportData}
        />
      </header>
    </div>
  );
}

export default App;
