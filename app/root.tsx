import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

// Define links for fonts and styling
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;900&display=swap",
  },
];

// Layout component for HTML structure
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 text-gray-900 font-sans leading-relaxed">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Root component for Sound Source company homepage and navigation
export function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-500 shadow-lg">
        <nav className="container mx-auto p-4 flex justify-between items-center text-white">
          <h1 className="text-2xl font-extrabold">Sound Source</h1>
          <div className="space-x-4">
            <Link
              to="/"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Job Search
            </Link>

            <Link
              to="/job-post"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Post a Job
            </Link>

            <Link
              to="/applications"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Manage Applications
            </Link>

            <Link
              to="/about"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              About Us
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold mb-4 text-orange-600">
            Welcome to Sound Source
          </h2>
          <p className="text-lg text-gray-800">
            Sound Source is a company dedicated to innovation in audio technology and music production. We bring every note and melody to the world.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">Our Services</h3>
            <p className="text-gray-700">
              Whether it's music production, audio processing, or sound design, Sound Source offers professional solutions to meet various client needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">Our Team</h3>
            <p className="text-gray-700">
              Our team is composed of experienced audio engineers, producers, and creatives, all committed to creating high-quality sound experiences.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">Join Us</h3>
            <p className="text-gray-700">
              If you're passionate about audio technology, join Sound Source and help us create the sounds of tomorrow.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <div className="container mx-auto text-center">
          <p>© 2024 Sound Source | Crafted with passion for sound</p>
        </div>
      </footer>
    </div>
  );
}

// Main application component
export default function App() {
  return (
    <Layout>
      <Root />
      <Outlet />
    </Layout>
  );
}
