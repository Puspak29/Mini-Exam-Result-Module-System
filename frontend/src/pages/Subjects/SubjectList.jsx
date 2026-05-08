import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../apis/axios';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await api.get(`/subjects?${params.toString()}`);
      if (response.data.success) {
        setSubjects(response.data.data.subjects || response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSubjects();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    try {
      const response = await api.delete(`/subjects/${id}`);
      if (response.data.success) {
        toast.success('Subject deleted successfully');
        fetchSubjects();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete subject');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
        <Link
          to="/subjects/add"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Subject</span>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Subject Name or Code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Subject Code</th>
                <th className="p-4 font-semibold">Subject Name</th>
                <th className="p-4 font-semibold">Full Marks</th>
                <th className="p-4 font-semibold">Pass Marks</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No subjects found</td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{subject.subjectCode}</td>
                    <td className="p-4 text-gray-700">{subject.subjectName}</td>
                    <td className="p-4 text-gray-700">{subject.fullMarks}</td>
                    <td className="p-4 text-gray-700">{subject.passMarks}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/subjects/edit/${subject._id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(subject._id)}
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
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
      />
    </div>
  );
};
export default SubjectList;
