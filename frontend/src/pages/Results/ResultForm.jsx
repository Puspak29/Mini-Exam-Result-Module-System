import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../apis/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
const schema = yup.object().shape({
  studentId: yup.string().required('Student is required'),
  examName: yup.string().required('Exam name is required').trim(),
  subjects: yup.array().of(
    yup.object().shape({
      subjectId: yup.string().required('Subject is required'),
      marksObtained: yup.number()
        .typeError('Must be a number')
        .required('Marks required')
        .min(0, 'Cannot be negative'),
    })
  ).min(1, 'At least one subject is required'),
});
const ResultForm = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subjects: [{ subjectId: '', marksObtained: '' }],
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, subjectsRes] = await Promise.all([
          api.get('/students'),
          api.get('/subjects')
        ]);
        if (studentsRes.data.success) setStudents(studentsRes.data.data.students || studentsRes.data.data);
        if (subjectsRes.data.success) setAvailableSubjects(subjectsRes.data.data.subjects || subjectsRes.data.data);
      } catch (error) {
        toast.error('Failed to load form data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const onSubmit = async (data) => {
    try {
      await api.post('/results', data);
      toast.success('Result added successfully');
      navigate('/results');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add result');
    }
  };
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/results" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Result</h1>
          <p className="text-gray-500">Enter student marks for the exam.</p>
        </div>
      </div>
      <div className="glass rounded-xl p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
              <select
                {...register('studentId')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
              >
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>
                ))}
              </select>
              {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name *</label>
              <input
                {...register('examName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Final Examination 2024"
              />
              {errors.examName && <p className="mt-1 text-sm text-red-600">{errors.examName.message}</p>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Subject Marks</h3>
              <button
                type="button"
                onClick={() => append({ subjectId: '', marksObtained: '' })}
                className="flex items-center gap-2 text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
              >
                <Plus size={16} /> Add Subject
              </button>
            </div>
            {errors.subjects?.root && <p className="mb-4 text-sm text-red-600">{errors.subjects.root.message}</p>}
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Subject</label>
                    <select
                      {...register(`subjects.${index}.subjectId`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                    >
                      <option value="">Select...</option>
                      {availableSubjects.map(sub => (
                        <option key={sub._id} value={sub._id}>{sub.subjectName} ({sub.subjectCode}) - Full: {sub.fullMarks}</option>
                      ))}
                    </select>
                    {errors.subjects?.[index]?.subjectId && <p className="mt-1 text-xs text-red-600">{errors.subjects[index].subjectId.message}</p>}
                  </div>
                  <div className="w-48">
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Marks Obtained</label>
                    <input
                      type="number"
                      {...register(`subjects.${index}.marksObtained`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="0"
                    />
                    {errors.subjects?.[index]?.marksObtained && <p className="mt-1 text-xs text-red-600">{errors.subjects[index].marksObtained.message}</p>}
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove Subject"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Link
              to="/results"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all font-medium disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Result'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResultForm;