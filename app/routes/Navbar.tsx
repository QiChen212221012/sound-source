import React, { useContext } from "react";
import { Link } from "@remix-run/react";
import { UserContext } from "./App"; // 引入用户上下文

export default function Navbar() {
  const { role, setRole } = useContext(UserContext);

  // 登出处理函数
  const handleLogout = () => {
    setRole(""); // 清除角色信息
  };

  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">Sound Source</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {role === "admin" && (
          <>
            <Link to="/admin" className="hover:underline">
              Admin Dashboard
            </Link>
            <Link to="/manage-jobs" className="hover:underline">
              Manage Jobs
            </Link>
            <Link to="/manage-applications" className="hover:underline">
              Manage Applications
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
        {role === "applicant" && (
          <>
            <Link to="/applicant" className="hover:underline">
              Applicant Dashboard
            </Link>
            <Link to="/JobSearch" className="hover:underline">
              Search Jobs
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
        {!role && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}