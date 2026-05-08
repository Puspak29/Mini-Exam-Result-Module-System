import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm print:hidden">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
          <User size={16} className="text-primary-500" />
          <span>Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};
export default Header;