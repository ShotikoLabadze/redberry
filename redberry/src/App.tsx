import { useState } from "react";
import Modal from "./components/Modal/Modal";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>modal</h2>
      </Modal>
    </div>
  );
}

export default App;
