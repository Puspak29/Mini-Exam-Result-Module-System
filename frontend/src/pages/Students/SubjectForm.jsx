import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../apis/axios';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
const schema = yup.object().shape({
  subjectName: yup.string().required('Subject name is required').trim(),
  subjectCode: yup.string().required('Subject code is required').trim(),
  fullMarks: yup.number()
    .typeError('Must be a number')
    .required('Full marks is required')
    .positive('Must be positive'),
  passMarks: yup.number()
    .typeError('Must be a number')
    .required('Pass marks is required')
    .positive('Must be positive')
    .lessThan(yup.ref('fullMarks'), 'Pass marks must be less than full marks'),
});
const SubjectForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (isEditMode) {
      const fetchSubject = async () => {
        try {
          const response = await api.get(`/subjects/${id}`);
          if (response.data.success) {
            const subject = response.data.data;
            reset({
              subjectName: subject.subjectName,
              subjectCode: subject.subjectCode,
              fullMarks: subject.fullMarks,
              passMarks: subject.passMarks,
            });
          }
        } catch (error) {
          toast.error('Failed to fetch subject details');
          navigate('/subjects');
        } finally {
          setLoading(false);
        }
      };
      fetchSubject();
    }
  }, [id, isEditMode, navigate, reset]);
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.put(`/subjects/${id}`, data);
        toast.success('Subject updated successfully');
      } else {
        await api.post('/subjects', data);
        toast.success('Subject added successfully');
      }
      navigate('/subjects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/subjects" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Subject' : 'Add New Subject'}
          </h1>
          <p className="text-gray-500">Enter the subject's details below.</p>
        </div>
      </div>
      <div className="glass rounded-xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
              <input
                {...register('subjectName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Mathematics"
              />
              {errors.subjectName && <p className="mt-1 text-sm text-red-600">{errors.subjectName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code *</label>
              <input
                {...register('subjectCode')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="MATH101"
              />
              {errors.subjectCode && <p className="mt-1 text-sm text-red-600">{errors.subjectCode.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Marks *</label>
              <input
                type="number"
                {...register('fullMarks')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="100"
              />
              {errors.fullMarks && <p className="mt-1 text-sm text-red-600">{errors.fullMarks.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pass Marks *</label>
              <input
                type="number"
                {...register('passMarks')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="40"
              />
              {errors.passMarks && <p className="mt-1 text-sm text-red-600">{errors.passMarks.message}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/subjects"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all font-medium disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SubjectForm;
