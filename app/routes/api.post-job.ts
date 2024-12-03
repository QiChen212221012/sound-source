import { json } from "@remix-run/node";
import { connectToDatabase } from "~/routes/utils.db";

export async function action({ request }: { request: Request }) {
  try {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, { status: 405 });
    }

    const newJob = await request.json();

    if (!newJob.title || !newJob.description || !newJob.location || !newJob.employmentType) {
      return json({ error: "Invalid input data" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection("jobs");

    const result = await collection.insertOne(newJob);

    return json({
      success: true,
      message: "Job posted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
