import { useEffect, useState } from "react";
import { getMe } from "./api/auth.service";
import Login from "./components/Login/Login";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import Registration from "./components/Registration/Registration";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [modalType, setModalType] = useState<"login" | "register" | "profile">(
    "login",
  );

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchUserData = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (err: any) {
      console.error("Auth failed or no token", err);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const openLogin = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  const openRegister = () => {
    setModalType("register");
    setIsModalOpen(true);
  };

  const openProfile = () => {
    setModalType("profile");
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    fetchUserData();
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={openLogin}
        onSignUpClick={openRegister}
        onProfileClick={openProfile}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "login" && (
          <Login onSwitchToSignUp={openRegister} onSuccess={handleSuccess} />
        )}

        {modalType === "register" && (
          <Registration onSwitchToLogin={openLogin} onSuccess={handleSuccess} />
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
