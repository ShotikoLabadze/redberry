import { useEffect, useState } from "react";
import { getMe } from "./api/auth.service";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import Registration from "./components/Registration/Registration";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [modalType, setModalType] = useState<"login" | "register" | "profile">(
    "login",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await getMe();
      setUser(res.data || res);
      setIsLoggedIn(true);
    } catch (err: any) {
      console.error("Auth failed", err);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    fetchUserData();
  };

  const openModal = (type: "login" | "register" | "profile") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => openModal("login")}
        onSignUpClick={() => openModal("register")}
        onProfileClick={() => openModal("profile")}
      />

      <main>
        <Dashboard />
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "login" && (
          <Login
            onSwitchToSignUp={() => openModal("register")}
            onSuccess={handleAuthSuccess}
          />
        )}

        {modalType === "register" && (
          <Registration
            onSwitchToLogin={() => openModal("login")}
            onSuccess={handleAuthSuccess}
          />
        )}

        {modalType === "profile" && (
          <Profile
            user={user}
            onClose={() => setIsModalOpen(false)}
            onUpdate={fetchUserData}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
