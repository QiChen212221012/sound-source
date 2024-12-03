import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "@remix-run/react";

// Simulated job data
const jobData = [
  {
    id: "1",
    title: "Audio Engineer",
    location: "Hangzhou, Zhejiang",
    employmentType: "Full-time",
    description:
      "Responsible for designing and optimizing audio signal processing. Assist in the development of audio hardware and software. Perform professional recording, mixing, and sound effects processing to ensure high-quality sound standards.",
    skillsRequired:
      "Proficiency in audio processing software such as Pro Tools, Logic Pro, etc. Strong knowledge of audio signal processing. Familiarity with audio equipment setup and maintenance.",
  },
  {
    id: "2",
    title: "Technical Support Engineer (Audio Devices)",
    location: "Shenzhen",
    employmentType: "Full-time",
    description:
      "Oversee the development and promotion of new audio device products. Manage the entire process from market research to product design and user feedback.",
    skillsRequired:
      "Experience in the audio industry. Excellent project management skills. Familiarity with product lifecycle management.",
  },
  {
    id: "3",
    title: "Music Production Specialist",
    location: "Remote",
    employmentType: "Remote - Preferably in the United States, Europe, or Australia",
    description:
      "Looking for a talented music production specialist to create, edit, and enhance music productions for various projects.",
    skillsRequired:
      "Expertise in DAWs such as Ableton Live, FL Studio, or Pro Tools. Strong creative and technical skills in music production.",
  },
  {
    id: "4",
    title: "Music Data Analyst",
    location: "United States, Canada, or Europe",
    employmentType: "Full-time Remote",
    description:
      "Analyze global music trends, listener behavior, and provide actionable insights for music production and marketing strategies.",
    skillsRequired:
      "Proficiency in data analysis tools such as Python, R, or SQL. Experience with music platforms like Spotify or Apple Music.",
  },
];

export default function JobSearch() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [noResults, setNoResults] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLocation(e.target.value);
  const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setEmploymentType(e.target.value);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const results = jobData.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        job.employmentType.toLowerCase().includes(employmentType.toLowerCase())
    );

    setFilteredJobs(results);
    setNoResults(results.length === 0);
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setEmploymentType("");
    setFilteredJobs(jobData);
    setNoResults(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Job Search
      </h2>
      <p className="text-gray-700 mb-8 text-center">
        Find your next opportunity in the exciting world of sound technology.
      </p>

      <form onSubmit={handleSearch} className="space-y-4">
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        >
          <option value="">Select Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-6">
        {filteredJobs.length > 0 && (
          <p className="text-gray-600">
            Found <strong>{filteredJobs.length}</strong> job
            {filteredJobs.length > 1 ? "s" : ""}.
          </p>
        )}
        {noResults ? (
          <p className="text-center text-gray-500">
            Sorry, no relevant positions available!
          </p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <h3 className="text-xl font-semibold text-orange-600">
                {job.title}
              </h3>
              <p className="text-gray-700">Location: {job.location}</p>
              <p className="text-gray-500">{job.employmentType}</p>
              <Link
                to={`/job/${job.id}`}
                className="mt-3 text-orange-500 font-bold hover:text-orange-700 transition"
              >
                View Details →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
