import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const [active, setActive] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className='sidebar-wrapper'>
        <div className='sidebar-logo'>
          <h3>KYC HUB</h3>
        </div>
        <ul>
          <li>
            <Link to="/" className={active === '/' ? 'active' : ''} onClick={() => setActive('/')}>Product Details</Link>
          </li>
          <li>
            <Link className={active === '/compare-product/:id' ? 'active' : ''} to="/compare-product/:id" onClick={() => setActive('/compare-product/:id')}>Compare Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
