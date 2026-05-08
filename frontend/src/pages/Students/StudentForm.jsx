import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../apis/axios';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
const schema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  rollNumber: yup.string().required('Roll number is required').trim(),
  className: yup.string().required('Class name is required').trim(),
  section: yup.string().trim(),
  email: yup.string().email('Invalid email').nullable().transform((v) => v === '' ? null : v),
  phone: yup.string().nullable().transform((v) => v === '' ? null : v),
});
const StudentForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const response = await api.get(`/students/${id}`);
          if (response.data.success) {
            const student = response.data.data;
            reset({
              name: student.name,
              rollNumber: student.rollNumber,
              className: student.className,
              section: student.section || '',
              email: student.email || '',
              phone: student.phone || '',
            });
          }
        } catch (error) {
          toast.error('Failed to fetch student details');
          navigate('/students');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode, navigate, reset]);
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.put(`/students/${id}`, data);
        toast.success('Student updated successfully');
      } else {
        await api.post('/students', data);
        toast.success('Student added successfully');
      }
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/students" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Student' : 'Add New Student'}
          </h1>
          <p className="text-gray-500">Enter the student's details below.</p>
        </div>
      </div>
      <div className="glass rounded-xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
              <input
                {...register('rollNumber')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="R-101"
              />
              {errors.rollNumber && <p className="mt-1 text-sm text-red-600">{errors.rollNumber.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
              <input
                {...register('className')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Class 10"
              />
              {errors.className && <p className="mt-1 text-sm text-red-600">{errors.className.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <input
                {...register('section')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/students"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all font-medium disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentForm;