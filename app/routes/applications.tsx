import { useState } from "react";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  // Fetch applications from API
  const fetchApplications = async () => {
    const response = await fetch("/api/applications");
    const data = await response.json();
    setApplications(data);
  };

  return (
    <div>
      <h1>Application Management</h1>
      <button onClick={fetchApplications}>Load Applications</button>
      <ul>
        {applications.map((app: any) => (
          <li key={app.id}>
            <p>Name: {app.name}</p>
            <p>Job: {app.jobTitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
