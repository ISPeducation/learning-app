import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-8">Welcome to LearnEasy</h1>
      <div className="flex flex-col gap-4 items-center">
        <Link to="/login/student" className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 w-64 text-lg">Student Login</Link>
        <Link to="/login/coach" className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 w-64 text-lg">Coach Login</Link>
        <Link to="/login/parent" className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-yellow-600 w-64 text-lg">Parent Login</Link>
        <Link to="/login/admin" className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-600 w-64 text-lg">Backend/Admin Login</Link>
      </div>
    </div>
  );
}
