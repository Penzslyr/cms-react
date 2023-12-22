import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <div className="layout">
      <div className="header">
        <div className="logo">Tara CMS</div>
        <div className="menu">
          <a href="/dashboard">Dashboard</a>
          {/* Add more menu items as needed */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="sidebar">
          <ul className="menu">
            <li>
              <a href="/Dashboard/ManageUser">Manage User</a>
            </li>
            <li>
              <a href="/Dashboard/ManageTrainer">Manage Trainer</a>
            </li>
            <li>
              <a href="/Dashboard/ManageTsx">Manage Transaction</a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
        <div>
          {/* Your main content goes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
