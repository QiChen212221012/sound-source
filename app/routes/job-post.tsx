import JobForm from "~/routes/components.JobForm";

export default function JobPost() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">Post a New Job</h2>
      <p className="text-gray-700 mb-8 text-center">
        Fill out the form below to create a new job posting. Describe the role, required skills, and location to attract the best candidates.
      </p>
      <JobForm />
    </div>
  );
}
