import { Link } from "@remix-run/react";

export default function ApplicantDashboard() {
  return (
    <div className="p-6">
      {/* 外部白色边框 */}
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        {/* 标题 */}
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8">
          Applicant Dashboard
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Explore job opportunities and submit your application easily.
        </p>

        {/* 内容块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* 搜索职位 */}
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Search Jobs</h2>
            <p className="text-gray-700 mb-3">
              Discover exciting job opportunities that match your skills and
              interests.
            </p>
            <Link
              to="/JobSearch"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              View Job Listings →
            </Link>
          </div>

          {/* 提交申请 */}
          <div className="p-6 bg-green-100 border border-green-300 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
              Submit Application
            </h2>
            <p className="text-gray-700 mb-3">
              Ready to apply? Submit your application and get started today.
            </p>
            <Link
              to="/applications"
              className="text-green-600 font-semibold hover:text-green-800 transition"
            >
              Submit Your Application →
            </Link>
          </div>
        </div>

        {/* 快速提交按钮 */}
        <div className="text-center">
          <Link
            to="/applications"
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Quick Submit an Application
          </Link>
        </div>
      </div>
    </div>
  );
}
