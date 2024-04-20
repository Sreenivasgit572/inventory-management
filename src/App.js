import React, { useState } from 'react';
import './App.css';
import AssetSubMenu from './components/AssetSubMenu';
import RoleSubMenu from './components/RoleSubMenu';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(null);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    if (section === 'asset') {
      setDisplayComponent(<AssetSubMenu />);
    } else if (section === 'role') {
      setDisplayComponent(<RoleSubMenu />);
    }
  };

  return (
    <div className="container">
      <div className="menu">
        <ul>
          <li onClick={() => handleMenuClick('asset')}>Asset Management</li>
          <li onClick={() => handleMenuClick('role')}>Role Management</li>
        </ul>
      </div>
      <div className="content">
        {displayComponent}
      </div>
    </div>
  );
}

export default App;