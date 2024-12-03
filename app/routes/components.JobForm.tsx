import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "@remix-run/react";

export default function JobForm() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    location: "",
    employmentType: "",
    salary: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!job.consent) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (!job.title || !job.description || !job.skillsRequired || !job.location || !job.employmentType) {
      setError("All fields except Salary must be filled out.");
      return;
    }

    try {
      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }

      setJob({
        title: "",
        description: "",
        skillsRequired: "",
        location: "",
        employmentType: "",
        salary: "",
        consent: false,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Job Details</h3>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills Required"
          value={job.skillsRequired}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Application Preferences</h3>
        <input
          type="text"
          name="employmentType"
          placeholder="Employment Type"
          value={job.employmentType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (Optional)"
          value={job.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      
      <div className="flex items-start space-x-2">
  <input
    type="checkbox"
    id="consentCheckbox"
    name="consent"
    checked={job.consent}
    onChange={handleChange}
    className="h-5 w-5 border-gray-300 rounded text-orange-600 focus:ring-orange-500"
    required
    aria-required="true"
  />
  <label htmlFor="consentCheckbox" className="text-sm text-gray-700">
    I agree to the{" "}
    <Link to="/terms-and-conditions" className="text-orange-500 underline">
      terms and conditions
    </Link>{" "}
    and consent to data processing in accordance with the{" "}
    <Link to="/privacy-policy" className="text-orange-500 underline">
      privacy policy
    </Link>.
  </label>
</div>



      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg"
      >
        Post Job
      </button>

      {submitted && <p className="text-green-600">Job posted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
