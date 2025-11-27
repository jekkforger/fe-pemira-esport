import { useState } from "react";
import { saveUser } from "../utils/storage";
import Logo from "/logo.png";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openGallery, setOpenGallery] = useState(false); // ⬅ STATE POPUP GALERI
  const [name, setName] = useState("");

const startVoting = async () => {
  if (!name.trim()) return;

  const res = await fetch("http://localhost:5000/api/voting/status");
  const status = await res.json();

  if (!status.voting_open) {
    alert("Voting belum dibuka oleh admin!");
    return;
  }

  sessionStorage.setItem("voter_name", name);
  window.location.href = "/vote";
};

  return (
    <div className="min-h-screen bg-animated-gradient flex flex-col items-center justify-center px-5">
      
      {/* LOGO */}
      <img
        src={Logo}
        alt="Logo"
        className="w-40 md:w-48 drop-shadow-2xl mb-6 animate-fadeIn"
      />

      {/* TITLE */}
      <h1 className="text-white text-3xl md:text-4xl font-extrabold text-center drop-shadow mb-3 animate-fadeIn">
        Pemira Polban Esport 2025
      </h1>

      {/* DESKRIPSI */}
      <p className="text-white/90 text-semibold text-center max-w-xl text-[15px] md:text-base mb-3 leading-relaxed animate-fadeIn delay-100">
        Gunakan hak suaramu dengan bijak dan pilih calon ketua terbaik untuk
        membawa UKM Polban Esport menuju lebih baik.
      </p>

      <p className="text-white/90 font-semibold max-w-xl text-[15px] md:text-base mb-8 leading-relaxed animate-fadeIn delay-100">
        #RiseHard #StayProud
      </p>

      {/* BUTTON UTAMA */}
      <button
        onClick={() => setOpenModal(true)}
        className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 transition p-3 rounded-lg text-white 
               font-semibold mb-4 animate-fadeIn delay-200"
      >
        Mulai Memilih
      </button>

      {/* BUTTON POPUP GALERI */}
      <div className="w-full max-w-xs animate-fadeIn delay-300">
        <button
          onClick={() => setOpenGallery(true)}
          className="w-full max-w-xs bg-blue-600/40 hover:bg-blue-600/60 transition p-3 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/40"
        >
          Galeri Prestasi
        </button>
      </div>

      {/* ================= MODAL INPUT NAMA ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/10 border border-white/20 w-full max-w-md p-7 rounded-xl shadow-xl animate-pop">
            <h2 className="text-white text-xl font-semibold mb-4 text-center">
              Masukkan Nama Kamu
            </h2>

            <input
              type="text"
              placeholder="Contoh: Hendri"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-neonBlue outline-none mb-5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* BUTTON LANJUTKAN */}
            <button
              onClick={startVoting}
              className="w-full bg-orange-500 hover:bg-orange-600 transition p-3 rounded-lg 
               text-white font-semibold shadow-md"
            >
              Lanjutkan
            </button>

            {/* BUTTON BATAL */}
            <button
              onClick={() => setOpenModal(false)}
              className="w-full mt-3 p-3 rounded-lg text-white/80 hover:text-white 
               bg-blue-500/20 hover:bg-blue-500/30 transition font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL GALERI PRESTASI ================= */}
      {openGallery && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn p-4 overflow-y-auto">
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl max-w-4xl w-full animate-pop">

            <h2 className="text-white text-2xl font-bold mb-6 text-center">
              Galeri Prestasi Polban Esport
            </h2>

            {/* GRID FOTO */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "/jajaka-cmc.png",
                "/jajaka-eat.png",
                "/jajaka-mechup.png",
                "/jajaka-oppo.png",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md hover:scale-105 transition"
                />
              ))}
            </div>

            {/* TOMBOL TUTUP */}
            <button
              onClick={() => setOpenGallery(false)}
              className="mt-6 w-full p-3 rounded-lg bg-blue-600/40 hover:bg-blue-600/60 text-white font-semibold transition"
            >
              Tutup
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
