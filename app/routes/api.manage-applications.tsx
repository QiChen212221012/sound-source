import { connectToDatabase } from "~/routes/utils.db";
import { json } from "@remix-run/node";
import { ObjectId } from "mongodb";

// Loader (GET): Fetch all applications
export async function loader() {
  try {
    const db = await connectToDatabase();
    const applications = await db.collection("applications").find().toArray();

    // Map ObjectId to string for frontend compatibility
    return json(
      applications.map((app) => ({
        ...app,
        _id: app._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

// Action (PUT, DELETE): Handle update and delete requests
export async function action({ request }: { request: Request }) {
  try {
    const db = await connectToDatabase();
    const method = request.method;

    if (method === "PUT") {
      const formData = await request.formData();
      const id = formData.get("id") as string;
      const status = formData.get("status") as string;

      if (!id || !status) {
        return json({ error: "ID and status are required" }, { status: 400 });
      }

      const result = await db
        .collection("applications")
        .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

      if (result.matchedCount === 0) {
        return json({ error: "Application not found" }, { status: 404 });
      }

      return json({ success: true, message: "Application status updated successfully" });
    }

    if (method === "DELETE") {
      const formData = await request.formData();
      const id = formData.get("id") as string;

      if (!id) {
        return json({ error: "ID is required to delete application" }, { status: 400 });
      }

      const result = await db.collection("applications").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return json({ error: "Application not found" }, { status: 404 });
      }

      return json({ success: true, message: "Application deleted successfully" });
    }

    return json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}
