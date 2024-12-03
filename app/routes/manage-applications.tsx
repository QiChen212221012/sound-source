import { useLoaderData, useFetcher } from "@remix-run/react";
import { useEffect } from "react";

// Define the type for an application
type Application = {
  _id: string;
  name: string;
  jobTitle: string;
  email: string;
  experience: number;
  status?: string;
};

// Define the type for fetcher response
type FetcherResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

// Loader to fetch applications data
export const loader = async () => {
  try {
    const response = await fetch("http://localhost:5174/api/manage-applications");
    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }
    const applications: Application[] = await response.json();
    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Response("Unable to load applications", { status: 500 });
  }
};

// Component to manage applications
export default function ManageApplications() {
  const applications = useLoaderData<Application[]>(); // Load data from the loader
  const fetcher = useFetcher<FetcherResponse>(); // Use fetcher for DELETE/PUT requests

  // Display success or error messages
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        alert(fetcher.data.message || "Operation successful!");
      } else if (fetcher.data.error) {
        alert(`Error: ${fetcher.data.error}`);
      }
    }
  }, [fetcher]);

  // Handle delete action
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const formData = new FormData();
      formData.append("id", id);
      fetcher.submit(formData, { method: "delete", action: "/api/manage-applications" });
    }
  };

  // Handle status update
  const handleUpdateStatus = (id: string, status: string) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    fetcher.submit(formData, { method: "put", action: "/api/manage-applications" });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Manage Applications</h2>
      {applications.length > 0 ? (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="p-4 border rounded-lg">
              <p>
                <strong>{app.name}</strong> applied for <strong>{app.jobTitle}</strong>
              </p>
              <p>Email: {app.email}</p>
              <p>Experience: {app.experience} years</p>
              <p>Status: {app.status || "Pending"}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleUpdateStatus(app._id, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(app._id, "Rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No applications available.</p>
      )}
    </div>
  );
}
