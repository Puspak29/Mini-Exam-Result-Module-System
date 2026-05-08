import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../apis/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Printer } from 'lucide-react';
const ResultDetail = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get(`/results/${id}`);
        if (response.data.success) {
          setResult(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to fetch result details');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);
  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  if (!result) return <div className="text-center py-10">Result not found</div>;
  return (
    <div className="max-w-4xl mx-auto space-y-6 print:m-0 print:p-0 print:space-y-0">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/results" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Result Details</h1>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Printer size={18} />
          <span>Print</span>
        </button>
      </div>
      <div className="glass rounded-2xl p-8 bg-white print:p-0 print:shadow-none print:border-none print:bg-transparent">
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-xl font-bold text-gray-500 uppercase tracking-widest hidden print:block mb-4">Mini Exam Result Module System</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 print:text-4xl">Student Report Card</h2>
          <p className="text-xl text-gray-600 print:text-gray-800 font-medium">{result.examName}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-6 mb-8 bg-gray-50 print:bg-white print:border print:border-gray-300 p-6 rounded-xl">
          <div>
            <p className="text-sm text-gray-500 font-medium">Student Name</p>
            <p className="text-lg font-bold text-gray-900">{result.studentId?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Roll Number</p>
            <p className="text-lg font-bold text-gray-900">{result.studentId?.rollNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Class</p>
            <p className="text-lg font-bold text-gray-900">{result.studentId?.className} {result.studentId?.section}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${result.isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result.isPassed ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        </div>
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="bg-primary-50 text-primary-900 border-y border-primary-200">
              <th className="p-4 font-bold">Subject</th>
              <th className="p-4 font-bold">Subject Code</th>
              <th className="p-4 font-bold text-center">Full Marks</th>
              <th className="p-4 font-bold text-center">Pass Marks</th>
              <th className="p-4 font-bold text-center">Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((sub, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900">{sub.subjectId?.subjectName}</td>
                <td className="p-4 text-gray-600">{sub.subjectId?.subjectCode}</td>
                <td className="p-4 text-center text-gray-600">{sub.subjectId?.fullMarks}</td>
                <td className="p-4 text-center text-gray-600">{sub.subjectId?.passMarks}</td>
                <td className="p-4 text-center font-bold text-gray-900">
                  <span className={sub.marksObtained < sub.subjectId?.passMarks ? 'text-red-600' : ''}>
                    {sub.marksObtained}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-bold border-y border-gray-200">
            <tr>
              <td colSpan="2" className="p-4 text-right">Total:</td>
              <td className="p-4 text-center">{result.totalFullMarks}</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center text-lg text-primary-700">{result.totalMarksObtained}</td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-between items-center bg-gray-900 text-white print:bg-white print:text-gray-900 print:border print:border-gray-300 print:shadow-none p-6 rounded-xl">
          <div>
            <p className="text-gray-400 print:text-gray-500 text-sm font-medium">Percentage</p>
            <p className="text-3xl font-bold">{result.percentage?.toFixed(2)}%</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 print:text-gray-500 text-sm font-medium">Overall Grade</p>
            <p className="text-4xl font-bold text-primary-400 print:text-gray-900">{result.grade}</p>
          </div>
        </div>
        
        <div className="hidden print:flex justify-between mt-20 pt-10 border-t border-gray-300">
          <div className="text-center w-48">
            <div className="border-b border-gray-400 h-8 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">Class Teacher's Signature</p>
          </div>
          <div className="text-center w-48">
            <div className="border-b border-gray-400 h-8 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">Principal's Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultDetail;
