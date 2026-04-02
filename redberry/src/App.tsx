import { useState } from "react";
import Modal from "./components/Modal/Modal";
import Registration from "./components/Registration/Registration";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Registration onSwitchToLogin={() => console.log("swi")} />
      </Modal>
    </div>
  );
}

export default App;
