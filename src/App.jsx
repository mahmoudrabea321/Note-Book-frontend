import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage.jsx";
import NotePage from "./pages/NotePage.jsx";

const App = () => {
  return (
    <div className="relative h-full w-full min-h-screen">
      <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </div>
  );
};

export default App;
