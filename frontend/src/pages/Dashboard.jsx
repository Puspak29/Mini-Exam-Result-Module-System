import React, { useEffect, useState } from 'react';
import api from '../apis/axios';
import { Users, BookOpen, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="glass p-6 rounded-2xl flex items-center gap-4 transition-transform hover:scale-105">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    totalResults: 0,
    passedStudents: 0,
    failedStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/summary');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon={Users} 
          colorClass="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Total Subjects" 
          value={stats.totalSubjects} 
          icon={BookOpen} 
          colorClass="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          title="Total Results" 
          value={stats.totalResults} 
          icon={GraduationCap} 
          colorClass="bg-indigo-100 text-indigo-600" 
        />
        <StatCard 
          title="Passed" 
          value={stats.passedStudents} 
          icon={CheckCircle} 
          colorClass="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Failed" 
          value={stats.failedStudents} 
          icon={XCircle} 
          colorClass="bg-red-100 text-red-600" 
        />
      </div>
    </div>
  );
};
export default Dashboard;
