import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "@remix-run/react";

export const UserContext = React.createContext({
  role: "",
  setRole: (role: string) => {},
});

export default function App() {
  const [role, setRole] = useState(""); // 管理用户角色

  return (
    <UserContext.Provider value={{ role, setRole }}>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </UserContext.Provider>
  );
}