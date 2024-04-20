import React, { useState } from 'react';
import '../css/AssetSubMenu.css'; // Import CSS file for styling
import NewAssetTab from '../components/AssetsManagementComponents/NewAssetsTab';
import AllocateAssetTab from '../components/AssetsManagementComponents/AllocateAssetTab';
import ViewAllocationsTab from '../components/AssetsManagementComponents/ViewAllocationsTab';
import UnallocateTab from '../components/AssetsManagementComponents/UnallocateAssetTab';

const AssetSubMenu = () => {
  const [activeTab, setActiveTab] = useState('NewAsset');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="asset-submenu">
      <div className="header">
        <h1>ASSET MANAGEMENT</h1>
        <hr className="divider" />
      </div>
      <div className="tab-container">
        <div className="tab-header">
          <div className={activeTab === 'NewAsset' ? 'tab active' : 'tab'} onClick={() => handleTabClick('NewAsset')}>New Asset</div>
          <div className={activeTab === 'AllocateAsset' ? 'tab active' : 'tab'} onClick={() => handleTabClick('AllocateAsset')}>Allocate Asset</div>
          <div className={activeTab === 'ViewAllocations' ? 'tab active' : 'tab'} onClick={() => handleTabClick('ViewAllocations')}>View Allocations</div>
          <div className={activeTab === 'Unallocate' ? 'tab active' : 'tab'} onClick={() => handleTabClick('Unallocate')}>Unallocate</div>
        </div>
        <div className="tab-content">
          {activeTab === 'NewAsset' && <NewAssetTab />}
          {activeTab === 'AllocateAsset' && <AllocateAssetTab />}
          {activeTab === 'ViewAllocations' && <ViewAllocationsTab />}
          {activeTab === 'Unallocate' && <UnallocateTab />}
        </div>
      </div>
    </div>
  );
};

export default AssetSubMenu;
