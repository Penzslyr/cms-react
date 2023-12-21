import React from "react";
import Header from "./Header";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <p>Manage Customer</p>
        </li>
        <li>
          <p>Manage Trainer</p>
        </li>
        <li>
          <p>Manage Transaction</p>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
