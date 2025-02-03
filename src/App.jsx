import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
