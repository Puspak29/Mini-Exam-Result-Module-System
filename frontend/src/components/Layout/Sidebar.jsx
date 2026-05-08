import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Results', path: '/results', icon: GraduationCap },
  ];
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm print:hidden">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600 tracking-tight">Exam Module</h1>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive 
                  ? 'bg-primary-50 text-primary-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon size={20} className={isActive ? 'text-primary-600' : 'text-gray-400'} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;
