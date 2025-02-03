import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import UpdatePassword from "./Pages/UpdatePassword";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
