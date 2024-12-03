import { json } from "@remix-run/node";
import { connectToDatabase } from "~/routes/utils.db";
import { ObjectId } from "mongodb";

// Loader (GET): Fetch all jobs
export async function loader() {
  try {
    const db = await connectToDatabase();
    const jobs = await db.collection("jobs").find().toArray();

    return json(
      jobs.map((job) => ({
        id: job._id.toString(),
        title: job.title,
        description: job.description,
        location: job.location,
        employmentType: job.employmentType,
        salary: job.salary || "Negotiable", // Provide default value
      }))
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return json({ error: "Failed to load jobs" }, { status: 500 });
  }
}

// Action (DELETE): Delete a job by ID
export async function action({ request }: { request: Request }) {
  if (request.method === "DELETE") {
    try {
      const db = await connectToDatabase();
      const { id } = await request.json();

      if (!id) {
        return json({ error: "Job ID is required" }, { status: 400 });
      }

      const result = await db
        .collection("jobs")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return json({ error: "Job not found" }, { status: 404 });
      }

      return json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("Error deleting job:", error);
      return json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  return json({ error: "Method not allowed" }, { status: 405 });
}