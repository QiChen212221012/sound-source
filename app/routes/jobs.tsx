import { useState, ChangeEvent } from "react";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setEmploymentType(e.target.value);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">Job Search</h2>
      <p className="text-gray-700 mb-8 text-center">
        Explore available job positions and find a career that suits your skills.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by job title or keyword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />
        <select
          value={employmentType}
          onChange={handleEmploymentTypeChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-8"
        >
          <option value="">Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>

        {/* Job List Section */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold text-orange-600">Software Engineer</h3>
            <p className="text-gray-700">Location: San Francisco, CA</p>
            <p className="text-gray-500">Full-time</p>
            <button className="mt-3 text-orange-500 font-bold hover:text-orange-700 transition">
              View Details →
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold text-orange-600">Project Manager</h3>
            <p className="text-gray-700">Location: Remote</p>
            <p className="text-gray-500">Contract</p>
            <button className="mt-3 text-orange-500 font-bold hover:text-orange-700 transition">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
