import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

type Job = {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
  skillsRequired?: string; // Optional
  salary?: string; // Added salary type
};

const jobData: Job[] = [
  {
    id: "1",
    title: "Audio Engineer",
    location: "Hangzhou, Zhejiang",
    employmentType: "Full-time",
    description:
      "Responsible for designing and optimizing audio signal processing. Assist in the development of audio hardware and software. Perform professional recording, mixing, and sound effects processing to ensure high-quality sound standards.",
    skillsRequired:
      "Proficiency in audio processing software such as Pro Tools, Logic Pro, etc. Strong knowledge of audio signal processing. Familiarity with audio equipment setup and maintenance.",
    salary: "Negotiable",
  },
  {
    id: "2",
    title: "Technical Support Engineer (Audio Devices)",
    location: "Shenzhen",
    employmentType: "Full-time",
    description:
      "Oversee the development and promotion of new audio device products. Manage the entire process from market research to product design and user feedback.",
    skillsRequired:
      "Experience in the audio industry. Excellent project management skills. Familiarity with product lifecycle management.",
    salary: "Negotiable",
  },
  {
    id: "3",
    title: "Music Production Specialist",
    location: "Remote",
    employmentType: "Remote - Preferably in the United States, Europe, or Australia",
    description: "Looking for a talented music production specialist to create, edit, and refine music.",
    skillsRequired:
      "Proficiency in DAWs (Digital Audio Workstations) like Ableton Live, Logic Pro, or Pro Tools. Experience with MIDI programming.",
    salary: "$30-$50/hourS",
  },
  {
    id: "4",
    title: "Music Data Analyst",
    location: "United States, Canada, or Europe",
    employmentType: "Full-time Remote",
    description:
      "Analyze global music trends, listener behavior, and market data to help shape our platform's content strategy.",
    skillsRequired:
      "Strong knowledge of data visualization tools (Tableau, Power BI). Proficiency in data analysis languages such as Python or R.",
    salary: "$60,000 - $80,000 annually",
  },
];

export const loader = async ({ params }: { params: { id: string } }) => {
  const job = jobData.find((job) => job.id === params.id);
  if (!job) {
    throw new Response("Job not found", { status: 404 });
  }
  return json(job);
};

export default function JobDetails() {
  const job = useLoaderData<Job>();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-4">{job.title}</h2>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Employment Type:</strong> {job.employmentType}
      </p>
      {job.skillsRequired && (
        <p>
          <strong>Skills Required:</strong> {job.skillsRequired}
        </p>
      )}
      {job.salary && (
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
      )}
      <a
        href="/JobSearch"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        ← Back to Job Search
      </a>
    </div>
  );
}
