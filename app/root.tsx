import React, { useContext, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";

// 定义上下文，用于共享角色状态
export const UserContext = React.createContext({
  role: "",
  setRole: (role: string) => {},
});

// 引入 Google Fonts 和 Tailwind
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

// 布局组件
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

// 导航栏组件，基于角色动态渲染
function Navbar() {
  const { role, setRole } = useContext(UserContext);

  const handleLogout = () => {
    setRole(""); // 清除角色状态
  };

  return (
    <nav className="bg-orange-500 shadow-lg text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold">
        <a href="/">Sound Source</a>
      </h1>
      <div className="space-x-4">
        {role === "admin" && (
          <>
            <a
              href="/admin"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Admin Dashboard
            </a>
            <a
              href="/manage-jobs"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Manage Jobs
            </a>
            <a
              href="/manage-applications"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Manage Applications
            </a>
            <button
              onClick={handleLogout}
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Logout
            </button>
          </>
        )}
        {role === "applicant" && (
          <>
            <a
              href="/applicant"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Applicant Dashboard
            </a>
            <a
              href="/JobSearch"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Search Jobs
            </a>
            <button
              onClick={handleLogout}
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Logout
            </button>
          </>
        )}
        {!role && (
          <>
            <a
              href="/login"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              Login
            </a>
            <a
              href="/about"
              className="hover:bg-orange-600 px-3 py-2 rounded-md transition hover:scale-105"
            >
              About Us
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

// 根组件
function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500"
            >
              Instagram
            </a>
          </div>
          {/* Footer Info */}
          <p className="text-sm">
            © 2024 Sound Source | Crafted with passion for sound
          </p>
        </div>
      </footer>
    </div>
  );
}

// 主应用组件
export default function App() {
  const [role, setRole] = useState(""); // 角色状态

  return (
    <UserContext.Provider value={{ role, setRole }}>
      <Layout>
        <Root />
      </Layout>
    </UserContext.Provider>
  );
}
