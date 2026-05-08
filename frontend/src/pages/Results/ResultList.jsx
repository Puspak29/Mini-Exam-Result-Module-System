import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../apis/axios';
import { Trash2, Plus, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examName, setExamName] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchResults = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (examName) params.append('examName', examName);
      
      const response = await api.get(`/results?${params.toString()}`);
      if (response.data.success) {
        setResults(response.data.data.results || response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [examName]);
  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    try {
      const response = await api.delete(`/results/${id}`);
      if (response.data.success) {
        toast.success('Result deleted successfully');
        fetchResults();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete result');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Results</h1>
        <Link
          to="/results/add"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Result</span>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Exam Name..."
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Exam Name</th>
                <th className="p-4 font-semibold">Percentage</th>
                <th className="p-4 font-semibold">Grade</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">No results found</td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{result.studentId?.name || 'Unknown'}</td>
                    <td className="p-4 text-gray-700">{result.examName}</td>
                    <td className="p-4 text-gray-700">{result.percentage?.toFixed(2)}%</td>
                    <td className="p-4 font-semibold">{result.grade}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${result.isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {result.isPassed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/results/${result._id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(result._id)}
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
        title="Delete Result"
        message="Are you sure you want to delete this result? This action cannot be undone."
      />
    </div>
  );
};
export default ResultList;
