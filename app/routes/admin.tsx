import { Link } from "@remix-run/react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8">Admin Dashboard</h1>
      <p className="text-gray-700 text-lg mb-6">
        Welcome, Admin! Use the tools below to manage jobs and applications effectively.
      </p>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Manage Jobs Section */}
        <div className="p-6 bg-green-100 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Manage Jobs</h2>
          <p className="text-gray-700 mb-4">Total Jobs Posted: 25</p>
          <Link
            to="/manage-jobs"
            className="text-green-600 font-bold underline hover:text-green-800"
          >
            View and Manage Jobs
          </Link>
        </div>

        {/* Manage Applications Section */}
        <div className="p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Manage Applications</h2>
          <p className="text-gray-700 mb-4">Total Applications Received: 100</p>
          <Link
            to="/manage-applications"
            className="text-blue-600 font-bold underline hover:text-blue-800"
          >
            View and Manage Applications
          </Link>
        </div>
      </div>

      {/* Quick Post Button */}
      <div className="mt-8">
        <Link
          to="/job-post"
          className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Quick Post a Job
        </Link>
      </div>
    </div>
  );
}
