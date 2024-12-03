import { json } from "@remix-run/node";
import { connectToDatabase } from "~/routes/utils.db";
import { ObjectId } from "mongodb";

export async function action({ request }: { request: Request }) {
  if (request.method !== "DELETE") {
    return json(
      { success: false, error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const contentType = request.headers.get("Content-Type");
    if (contentType !== "application/json") {
      return json(
        { success: false, error: "Invalid Content-Type. Expected application/json" },
        { status: 400 }
      );
    }

    const { id } = await request.json(); // Parse request body as JSON

    if (!id) {
      return json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const jobsCollection = db.collection("jobs");

    const deleteResult = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return json(
      { success: true, message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return json(
      { success: false, error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
