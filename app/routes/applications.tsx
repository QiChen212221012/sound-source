import { useState } from "react";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true); // Set loading state
    const response = await fetch("/api/applications");
    const data = await response.json();
    setApplications(data);
    setLoading(false); // Reset loading state
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">Application Management</h2>
      <p className="text-gray-700 mb-8 text-center">
        View and manage applications submitted by candidates. Check details and ensure they meet the job requirements.
      </p>
      <button
        onClick={fetchApplications}
        className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {loading ? "Loading..." : "Load Applications"}
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.length === 0 && !loading ? (
          <p className="text-gray-600 text-center col-span-2">No applications available.</p>
        ) : (
          applications.map((app: any) => (
            <div
              key={app.id}
              className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Applicant: {app.name}</h3>
              <p className="text-gray-800 mb-1">
                <strong>Job Title:</strong> {app.jobTitle}
              </p>
              <p className="text-gray-800 mb-1">
                <strong>Email:</strong> {app.email}
              </p>
              <p className="text-gray-800 mb-4">
                <strong>Experience:</strong> {app.experience} years
              </p>
              <div className="flex justify-between">
                <button className="text-sm bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition">
                  Approve
                </button>
                <button className="text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
