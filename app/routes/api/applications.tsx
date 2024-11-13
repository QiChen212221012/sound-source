import { json } from "@remix-run/node";

let applications = [
  { id: 1, name: "John Doe", jobTitle: "Audio Engineer" },
  { id: 2, name: "Jane Smith", jobTitle: "Music Producer" },
];

export async function action({ request }: { request: Request }) {
  const data = await request.json();
  if (request.method === "POST") {
    const newApplication = { ...data, id: applications.length + 1 };
    applications.push(newApplication);
    return json(newApplication, { status: 201 });
  }
  return json(applications);
}
