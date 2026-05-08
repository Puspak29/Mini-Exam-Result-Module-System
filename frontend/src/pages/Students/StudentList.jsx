import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../apis/axios';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [className, setClassName] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (className) params.append('className', className);
      
      const response = await api.get(`/students?${params.toString()}`);
      if (response.data.success) {
        setStudents(response.data.data.students || response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Add a small debounce for search
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, className]);
  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    try {
      const response = await api.delete(`/students/${id}`);
      if (response.data.success) {
        toast.success('Student deleted successfully');
        fetchStudents();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <Link
          to="/students/add"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Student</span>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Name or Roll Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <div className="w-64">
          <input
            type="text"
            placeholder="Filter by Class..."
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Roll No</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Class & Section</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No students found</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="p-4 text-gray-700">{student.name}</td>
                    <td className="p-4 text-gray-700">{student.className} {student.section ? `- ${student.section}` : ''}</td>
                    <td className="p-4 text-gray-700">{student.email || '-'}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/students/edit/${student._id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(student._id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </div>
  );
};
export default StudentList;
