import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./components/main/Main";
import { WorkerForm } from "./components/workerForm/WorkerForm";
import { LaptopInfo } from "./components/laptopInfo/LaptopInfo";
import { LaptopList } from "./components/laptopList/LaptopList";
import { LaptopInfoPage } from "./components/laptopInfoPage/LaptopInfoPage";
import { BackButton } from "./components/backButton/BackButton";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/workerform" element={<WorkerForm />} />
      <Route path="/laptopinfo" element={<LaptopInfo />} />
      <Route path="/laptoplist" element={<LaptopList />} />
      <Route path="/laptopinfo/:id" element={<LaptopInfoPage />} />
      <Route path="/" element={<BackButton />} />
    </Routes>
  );
}

export default App;
