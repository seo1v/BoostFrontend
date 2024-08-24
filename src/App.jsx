import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GroupPage from './components/GroupPage';
import UploadMemoryModal from './components/UploadMemoryModal';
import PrivateMemoryPermissionPage from './components/PrivateMemoryPermissionPage';
import MemoryDetailPage from './components/MemoryDetailPage';
import CreateGroupPage from './components/createGroupPage';
import UnifiedGroupPage from './components/unifiedGroupPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/group" element={<GroupPage />} />
        <Route path="/uploadmemory" element={<UploadMemoryModal />} />
        <Route path="/privatepermission" element={<PrivateMemoryPermissionPage />} />
        <Route path="/memorydetail" element={<MemoryDetailPage />} />
        <Route path="/creategroup" element={<CreateGroupPage />} />
        <Route path="/" element={<UnifiedGroupPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;