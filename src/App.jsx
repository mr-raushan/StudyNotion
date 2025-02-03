import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./Pages/About";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
