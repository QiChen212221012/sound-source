import { Link } from "@remix-run/react";

export default function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/job-post">Post a Job</Link>
      <Link to="/applications">Manage Applications</Link>
    </div>
  );
}
