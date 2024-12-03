import { useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";

type FetcherData = {
  success?: boolean;
  error?: string | { message: string }[];
};

export default function Applications() {
  const fetcher = useFetcher<FetcherData>(); // Define fetcher data type
  const [formState, setFormState] = useState({
    name: "",
    jobTitle: "",
    email: "",
    experience: "",
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Effect to handle fetcher response and prevent infinite re-renders
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        setMessage({ type: "success", text: "Application submitted successfully!" });
        setFormState({ name: "", jobTitle: "", email: "", experience: "" }); // Reset form
      } else if (fetcher.data.error) {
        const errorText =
          Array.isArray(fetcher.data.error)
            ? fetcher.data.error[0]?.message || "Submission failed."
            : fetcher.data.error || "Submission failed.";
        setMessage({ type: "error", text: errorText });
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages
    fetcher.submit(formState, { method: "post", action: "/api/applications" });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">Submit Your Application</h2>
      <p className="text-gray-500 mb-6 text-center">
        Fill in your details below to apply for a job at Sound Source.
      </p>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 mb-4 ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          } rounded-lg`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formState.jobTitle}
          onChange={(e) => setFormState({ ...formState, jobTitle: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formState.experience}
          onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition"
          disabled={fetcher.state === "submitting"}
        >
          {fetcher.state === "submitting" ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
