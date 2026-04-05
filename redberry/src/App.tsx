import { useState } from "react";
import Login from "./components/Login/Login";
import Modal from "./components/Modal/Modal";
import Registration from "./components/Registration/Registration";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState<"login" | "register">("login");

  const openLogin = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  const openRegister = () => {
    setModalType("register");
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    console.log("Authenticated successfully!");
  };

  return (
    <div>
      <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "login" ? (
          <Login onSwitchToSignUp={openRegister} onSuccess={handleSuccess} />
        ) : (
          <Registration onSwitchToLogin={openLogin} onSuccess={handleSuccess} />
        )}
      </Modal>
    </div>
  );
}

export default App;
