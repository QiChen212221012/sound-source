import { useState, useContext } from "react";
import { useNavigate } from "@remix-run/react";
import { UserContext } from "./App";

export default function Login() {
  const { setRole } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 模拟后端登录验证
    if (username === "admin" && password === "admin123") {
      setRole("admin");
      navigate("/admin"); // 跳转到管理员页面
    } else if (username === "applicant" && password === "app123") {
      setRole("applicant");
      navigate("/applicant"); // 跳转到申请者页面
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
