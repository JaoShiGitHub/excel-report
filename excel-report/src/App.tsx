import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MeatSteamGrindingExportButton from "./components/ExportButton";

const meatSteamGrindingExportData = [
  {
    firstShiftLeader: "Harry",
    secondShiftLeader: "Hermione",
    thirdShiftLeader: "Ron",
    supervisor: "Dumbledore",

    date: new Date().toISOString(),
    productName: "Pad Thai",

    batchNo: "B12345",
    inspectionTime: "10/10/2025 10:00 AM",
    expiredTime: "12:00 PM",
    grinderOperator: "Voldemort",
  },
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
