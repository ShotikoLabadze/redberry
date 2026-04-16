import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getMe } from "./api/auth.service";
import { getMyEnrollments } from "./api/course.service";
import Catalog from "./components/Catalog/Catalog";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import EnrolledSidebar from "./components/EnrolledSidebar/EnrolledSidebar";
import Login from "./components/Login/Login";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import Registration from "./components/Registration/Registration";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [modalType, setModalType] = useState<"login" | "register" | "profile">(
    "login",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchEnrollments = async () => {
    try {
      const res = await getMyEnrollments();
      setEnrollments(res.data || res);
    } catch (err) {
      console.error("Failed to fetch enrollments", err);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await getMe();
      setUser(res.data || res);
      setIsLoggedIn(true);
      fetchEnrollments();
    } catch (err: any) {
      console.error("Auth failed", err);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      setUser(null);
      setEnrollments([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }

    const handleRefresh = () => fetchEnrollments();
    window.addEventListener("refreshEnrollments", handleRefresh);

    return () => {
      window.removeEventListener("refreshEnrollments", handleRefresh);
    };
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
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => openModal("login")}
        onSignUpClick={() => openModal("register")}
        onProfileClick={() => openModal("profile")}
        onEnrolledClick={() => setIsSidebarOpen(true)}
      />

      <EnrolledSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        enrollments={enrollments}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                isLoggedIn={isLoggedIn}
                onLoginClick={() => openModal("login")}
                onSeeAllClick={() => setIsSidebarOpen(true)}
              />
            }
          />
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/course/:id"
            element={
              <CourseDetails
                user={user}
                onProfileClick={() => openModal("profile")}
                isLoggedIn={isLoggedIn}
                onLoginClick={() => openModal("login")}
              />
            }
          />
        </Routes>
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

      <Footer
        isLoggedIn={isLoggedIn}
        onLoginClick={() => openModal("login")}
        onProfileClick={() => openModal("profile")}
        onEnrolledClick={() => setIsSidebarOpen(true)}
      />
    </BrowserRouter>
  );
}

export default App;
