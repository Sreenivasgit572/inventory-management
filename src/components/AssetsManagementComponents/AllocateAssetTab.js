import React, { useState } from 'react';
import '../../css/AllocateAssetTab.css';
import UnallocateTab from './UnallocateAssetTab';

const AllocateAssetTab = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [existingAssetList, setExistingAssetList] = useState([]);
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

  const handleRemoveRow = (index, isNew) => {
    if (isNew) {
      const updatedList = [...newAssetList];
      updatedList.splice(index, 1);
      setNewAssetList(updatedList);
    } else {
      const updatedList = [...existingAssetList];
      updatedList.splice(index, 1);
      setExistingAssetList(updatedList);
    }
    setRedirectToUnallocate(true);
  };

  const handleSeeAllocations = async () => {
    // Simulate fetching data from an API
    const data = [
      { assetType: 'Laptop', allocatedOn: '2024-04-28' },
      { assetType: 'Desktop', allocatedOn: '2024-04-29' },
      { assetType: 'Keyboard', allocatedOn: '2024-04-30' },
    ];
    setExistingAssetList(data);
  };

  if (redirectToUnallocate) {
    return <UnallocateTab />;
  }

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
        <button onClick={handleSeeAllocations}>See Allocations</button>
      </div>
      <div className="asset-list">
        <div className="add-new-row">
          <button onClick={handleAddRow}>+</button>
        </div>
        <h3>List of Assets</h3>
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Asset Type</th>
              <th>Allocated On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {existingAssetList.map((asset, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={asset.assetType}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={asset.allocatedOn}
                    readOnly
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveRow(index, false)}>Unallocate</button>
                </td>
              </tr>
            ))}
            {newAssetList.map((asset, index) => (
              <tr key={index + existingAssetList.length}>
                <td>{index + existingAssetList.length + 1}</td>
                <td>
                  <select
                    value={asset.assetType}
                    onChange={(e) => {
                      const updatedList = [...newAssetList];
                      updatedList[index].assetType = e.target.value;
                      setNewAssetList(updatedList);
                    }}
                  >
                    <option value="">Select Asset Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Keyboard">Keyboard</option>
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={asset.allocatedOn}
                    onChange={(e) => {
                      const updatedList = [...newAssetList];
                      updatedList[index].allocatedOn = e.target.value;
                      setNewAssetList(updatedList);
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveRow(index, true)}>Unallocate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="unallocate-button" onClick={() => setRedirectToUnallocate(true)}>Unallocate All</button>
    </div>
  );
};

export default AllocateAssetTab;
