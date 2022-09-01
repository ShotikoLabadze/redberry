import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./components/main/Main";
import { WorkerForm } from "./components/workerForm/WorkerForm";
import { LaptopInfo } from "./components/laptopInfo/LaptopInfo";
import { LaptopList } from "./components/laptopList/LaptopList";
import { LaptopListPage } from "./components/laptopListPage/LaptopListPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/workerform" element={<WorkerForm />} />
      <Route path="/laptopinfo" element={<LaptopInfo />} />
      <Route path="/laptoplist" element={<LaptopList />} />
      <Route path="/laptopinfo/:id" element={<LaptopListPage />} />
    </Routes>
  );
}

export default App;
