import React from "react";
import "./App.css";
import { Main } from "./components/main/Main";
import { WorkerForm } from "./components/workerForm/WorkerForm";
import { LaptopList } from "./components/laptopList/LaptopList";
import { LaptopInfo } from "./components/laptopInfo/LaptopInfo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/WorkerForm" element={<WorkerForm />} />
      <Route path="/LaptopList" element={<LaptopList />} />
      <Route path="/LaptopInfo" element={<LaptopInfo />} />
    </Routes>
  );
}

export default App;
