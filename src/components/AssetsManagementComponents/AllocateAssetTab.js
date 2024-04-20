import React, { useState } from 'react';
import '../../css/AllocateAssetTab.css';
import UnallocateTab from './UnallocateAssetTab';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid

const AllocateAssetTab = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [assetList, setAssetList] = useState([
    { id: 1, assetType: 'Laptop', allocatedOn: '2024-04-28' },
    { id: 2, assetType: 'Desktop', allocatedOn: '2024-04-29' },
    { id: 3, assetType: 'Keyboard', allocatedOn: '2024-04-30' },
  ]);
  const [newAssetList, setNewAssetList] = useState([]);
  const [newAssetType, setNewAssetType] = useState('');
  const [allocatedOn, setAllocatedOn] = useState('');
  const [redirectToUnallocate, setRedirectToUnallocate] = useState(false);

  const handleAddRow = () => {
    const newAsset = { assetType: newAssetType, allocatedOn: allocatedOn };
    setNewAssetList([...newAssetList, newAsset]);
    setNewAssetType('');
    setAllocatedOn('');
  };

  const handleRemoveRow = (id, isNew) => {
    if (isNew) {
      const updatedList = newAssetList.filter(asset => asset.id !== id);
      setNewAssetList(updatedList);
    } else {
      const updatedList = assetList.filter(asset => asset.id !== id);
      setAssetList(updatedList);
    }
    setRedirectToUnallocate(true);
  };

  if (redirectToUnallocate) {
    return <UnallocateTab />;
  }

  const columns = [
    { field: 'id', headerName: 'Sl. No', width: 120 },
    { field: 'assetType', headerName: 'Asset Type', width: 200 },
    { field: 'allocatedOn', headerName: 'Allocated On', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: ({ row }) => (
        <button onClick={() => handleRemoveRow(row.id, row.isNew)}>Unallocate</button>
      ),
    },
  ];

  return (
    <div className="allocate-asset-tab">
      <h2>Allocate Asset</h2>
      <div className="input-row">
        <label htmlFor="employeeId">Employee Id:</label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={() => alert('See Allocations button clicked')}>See Allocations</button>
      </div>
      <div className="asset-list">
        <div className="add-new-row">
          <button onClick={handleAddRow}>+</button>
        </div>
        <h3>List of Assets</h3>
        <DataGrid
          rows={assetList.concat(newAssetList.map((asset, index) => ({ ...asset, id: assetList.length + index + 1, isNew: true })))}
          columns={columns}
          autoHeight
        />
      </div>
      <button className="unallocate-button" onClick={() => setRedirectToUnallocate(true)}>Unallocate All</button>
    </div>
  );
};

export default AllocateAssetTab;
