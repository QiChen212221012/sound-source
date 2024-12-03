import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { connectToDatabase } from "~/routes/utils.db";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salary?: string;
  skillsRequired?: string; // Added skillsRequired type
};

// Loader function to fetch jobs from the database
export async function loader() {
  try {
    const db = await connectToDatabase();
    const jobsCollection = db.collection("jobs");
    const jobs = await jobsCollection.find().toArray();

    // Ensure proper data mapping
    return json(
      jobs.map((job) => ({
        id: job._id?.toString() || "", // Ensure _id is converted to string
        title: job.title || "Untitled Job",
        description: job.description || "No description provided.",
        location: job.location || "No location specified.",
        employmentType: job.employmentType || "Unknown",
        salary: job.salary || "Negotiable", // Default salary
        skillsRequired: job.skillsRequired || "Not specified.", // Default skillsRequired
      }))
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return json({ error: "Failed to load jobs" }, { status: 500 });
  }
}

export default function ManageJobs() {
  const jobs = useLoaderData<Job[]>(); // Data from loader

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch("/api/delete-job", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Failed to delete job: ${errorData.error}`);
        } else {
          alert("Job deleted successfully!");
          window.location.reload(); // Refresh page to update the list
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Manage Jobs
      </h2>
      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-700">{job.title}</h3>
                <p className="text-sm text-gray-500"><strong>Job Description: </strong>{job.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Skills Required:</strong> {job.skillsRequired}
                </p>
                <p className="text-sm text-gray-500"><strong>Location: </strong>{job.location}</p>
                <p className="text-sm text-gray-500">
                  <strong >Type: </strong>{job.employmentType}
                </p>
                {job.salary && (
                  <p className="text-sm text-gray-500"><strong>Salary: </strong> {job.salary}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => alert(`Edit Job ID: ${job.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
}
