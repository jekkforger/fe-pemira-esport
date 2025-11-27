import { useState } from "react";

export default function KandidatForm({ onAdded }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");

  const addCandidate = () => {
    const old = JSON.parse(localStorage.getItem("candidates") || "[]");

    if (old.length >= 5) {
      alert("Maksimal 5 kandidat!");
      return;
    }

    const newCandidate = {
      id: Date.now(),
      name,
      photo,
      vision,
      mission,
    };

    localStorage.setItem("candidates", JSON.stringify([...old, newCandidate]));
    onAdded();
    setName("");
    setPhoto("");
    setVision("");
    setMission("");
  };

  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-xl mb-8">

      <h2 className="text-xl font-semibold mb-4">Tambah Kandidat</h2>

      <input
        className="w-full bg-white/20 p-3 rounded-lg mb-3 text-white"
        placeholder="Nama Kandidat"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full bg-white/20 p-3 rounded-lg mb-3 text-white"
        placeholder="URL Foto Kandidat"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />

      <textarea
        className="w-full bg-white/20 p-3 rounded-lg mb-3 text-white"
        placeholder="Visi Kandidat"
        value={vision}
        onChange={(e) => setVision(e.target.value)}
      />

      <textarea
        className="w-full bg-white/20 p-3 rounded-lg mb-3 text-white"
        placeholder="Misi Kandidat"
        value={mission}
        onChange={(e) => setMission(e.target.value)}
      />

      <button
        className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg mt-2"
        onClick={addCandidate}
      >
        Tambah Kandidat
      </button>

    </div>
  );
}
