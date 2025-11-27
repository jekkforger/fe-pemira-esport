import { useState } from "react";
import { saveUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function InputName() {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) return;
    saveUser(name);
    window.location.href = "/vote";
  };

  return (
    <div className="min-h-screen bg-animated-gradient flex flex-col items-center justify-center px-5">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo Polban Esport"
        className="w-36 md:w-44 mb-10 drop-shadow-xl animate-fadeIn"
      />

      {/* Form */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/20 animate-fadeIn">
        <h1 className="text-white text-2xl font-semibold mb-5 text-center">
          Masukkan Nama Kamu
        </h1>

        <input
          type="text"
          placeholder="Contoh: Hendri"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-neonBlue outline-none mb-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleNext}
          className="w-full bg-orangeAccent hover:bg-orange-500 transition text-white font-semibold p-3 rounded-lg"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
