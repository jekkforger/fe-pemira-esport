import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/logo.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "polbanesport2025") {
      navigate("/admin/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-animated-gradient flex flex-col items-center justify-center px-5">
      {/* LOGO + TITLE */}
      <div className="flex flex-col items-center mb-6 animate-fadeIn">
        <img src={Logo} className="w-[150px] h-[150px] drop-shadow-xl mb-3" />
        <h1 className="text-white text-3xl font-semibold">Login Admin</h1>
      </div>

      {/* CARD LOGIN */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 animate-pop">
        <h2 className="text-white text-xl font-semibold mb-4">Admin Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white opacity-80 hover:opacity-100 transition"
          >
            {showPassword ? (
              // EYE OFF
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 13.5m-.416 3.45A9.98 9.98 0 0112 
                    17.5c-5 0-9-4.5-9-4.5a20.54 20.54 0 012.395-2.797m4.082-2.496A9.97 9.97 0 
                    0112 6.5c5 0 9 4.5 9 4.5a20.54 20.54 0 01-2.697 3.31"
                />
              </svg>
            ) : (
              // EYE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 
                    4.5c4.637 0 8.573 3.007 9.963 7.178.07.207.07.435 0 .643C20.577 
                    16.49 16.64 19.5 12 19.5c-4.637 0-8.573-3.006-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ERROR TEXT */}
        {error && (
          <p className="text-red-300 text-sm mb-3 text-center">{error}</p>
        )}

        {/* LOGIN BUTTON — ORANGE */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 transition p-3 rounded-lg text-white font-semibold shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}
