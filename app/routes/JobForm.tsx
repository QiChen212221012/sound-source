import { useState, ChangeEvent, FormEvent } from "react";

export default function JobForm() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    location: "",
    employmentType: "",
    salary: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    setJob({
      title: "",
      description: "",
      skillsRequired: "",
      location: "",
      employmentType: "",
      salary: "",
    });
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center">Post a New Job</h2>
      <p className="text-center text-gray-500">Fill out the form below to create a new job listing.</p>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Job Details</h3>
        <input
          type="text"
          name="title"
          placeholder="Job Title *"
          value={job.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          name="description"
          placeholder="Job Description *"
          value={job.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills Required *"
          value={job.skillsRequired}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location *"
          value={job.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Application Preferences</h3>
        <input
          type="text"
          name="employmentType"
          placeholder="Employment Type (e.g., Full-time, Part-time)"
          value={job.employmentType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (Optional)"
          value={job.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Post Job
      </button>

      {submitted && (
        <p className="mt-4 text-center text-green-600 font-semibold">Job posted successfully!</p>
      )}
    </form>
  );
}
