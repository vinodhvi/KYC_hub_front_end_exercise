import React from "react";
import './Navbar.css';
import { MenuFoldOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="nav-menu-icon" onClick={toggleSidebar}>
          <MenuFoldOutlined />
        </div>
        <div className="user-profile">
          <UserOutlined />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
