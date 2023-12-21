import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ManageTrainer from "./pages/ManageTrainer";
import ManageTsx from "./pages/ManageTsx";
import ManageUser from "./pages/ManageUser";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        <Sidebar />
        {/* Your main content goes here */}
      </div>
      <Routes>
        <Route path="/ManageTrainer" element={<ManageTrainer />} />
        <Route path="/ManageTsx" element={<ManageTsx />} />
        <Route path="/" element={<ManageUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
