import { connectToDatabase } from "~/routes/utils.db";
import { json } from "@remix-run/node";
import * as z from "zod";

// Validation Schema
const ApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  experience: z.string().refine((val) => !isNaN(Number(val)), "Experience must be a number"),
});

// POST Handler
export async function action({ request }: { request: Request }) {
  try {
    if (request.method === "POST") {
      const db = await connectToDatabase();
      const body = Object.fromEntries(await request.formData());
      const validation = ApplicationSchema.safeParse(body);

      if (!validation.success) {
        return json({ error: validation.error.errors }, { status: 400 });
      }

      const newApplication = {
        ...validation.data,
        experience: parseInt(validation.data.experience, 10),
        status: "Pending",
      };

      const result = await db.collection("applications").insertOne(newApplication);
      return json({ success: true, id: result.insertedId }, { status: 201 });
    }

    return json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error while handling POST request:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}
