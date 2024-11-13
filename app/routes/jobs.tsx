import { useState, ChangeEvent, FormEvent } from "react";

// Define the Job type
type Job = {
  id: number;
  title: string;
  description: string;
  skillsRequired: string;
  location: string;
};

export default function Jobs() {
  const [criteria, setCriteria] = useState({ title: "", skills: "", location: "" });
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria),
    });
    const data = await response.json();
    setJobs(data);
  };

  return (
    <div>
      <h1>Job Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="title" placeholder="Job Title" value={criteria.title} onChange={handleInputChange} />
        <input type="text" name="skills" placeholder="Skills" value={criteria.skills} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Location" value={criteria.location} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        {jobs.map((job) => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Skills Required: {job.skillsRequired}</p>
            <p>Location: {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
