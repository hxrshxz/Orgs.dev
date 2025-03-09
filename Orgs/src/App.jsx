import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div>
      <Home />
      <TopBar />
      <SideBar />
    </div>
  );
}

export default App;
