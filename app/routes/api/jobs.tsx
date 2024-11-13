import { json } from "@remix-run/node";

let jobs = [
  { id: 1, title: "Audio Engineer", description: "Responsible for audio processing", skillsRequired: "Audio Editing", location: "Beijing" },
  { id: 2, title: "Music Producer", description: "Responsible for music production", skillsRequired: "Music Production", location: "Shanghai" },
];

export async function action({ request }: { request: Request }) {
  const data = await request.json();
  if (request.method === "POST") {
    const newJob = { ...data, id: jobs.length + 1 };
    jobs.push(newJob);
    return json(newJob, { status: 201 });
  }
  return json(jobs);
}
