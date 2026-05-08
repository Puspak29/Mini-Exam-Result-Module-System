import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-left" style={{ textAlign: 'left', width: '100%', border: 'none' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full w-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 print:p-0 print:bg-white print:overflow-visible">
          <div className="max-w-6xl mx-auto print:max-w-none print:w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
