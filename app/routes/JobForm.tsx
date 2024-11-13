import { useState, ChangeEvent, FormEvent } from "react";

export default function JobForm() {
  const [job, setJob] = useState({ title: "", description: "", skillsRequired: "", location: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
      <input type="text" name="description" placeholder="Job Description" value={job.description} onChange={handleChange} />
      <input type="text" name="skillsRequired" placeholder="Skills Required" value={job.skillsRequired} onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} />
      <button type="submit">Post Job</button>
    </form>
  );
}
