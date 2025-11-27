import { useState, useEffect } from "react";

export default function Voting() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votingOpen, setVotingOpen] = useState(true);
  const [showVotingClosedModal, setShowVotingClosedModal] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Calon 1",
      image: "/jajaka-oppo.png",
      vision:
        "Menjadi pusat pengembangan ekosistem esports mahasiswa Polban yang unggul, profesional, dan berdaya saing tinggi, dengan mengintegrasikan kompetisi, pembelajaran, dan inovasi digital untuk mencetak generasi produktif dan berintegritas.",
      mission: [
        "Mendorong pembinaan dan pengembangan potensi mahasiswa melalui pelatihan teknis, manajerial, dan mentalitas.",
        "Menyelenggarakan kegiatan kompetisi internal untuk menjaring minat dan bakat lingkup kampus.",
        "Menjalin kerja sama strategis dengan pihak internal maupun eksternal kampus guna memperluas jejaring profesional dan peluang karir di dunia digital.",
        "Menyelenggarakan kompetisi skala besar sebagai wadah pengembangan prestasi.",
        "Melakukan sosialisasi edukatif kepada generasi muda sebagai upaya memperluas wawasan terhadap dunia esport secara menyeluruh.",
      ],
    },

    {
      id: 2,
      name: "Calon 2",
      image: "/jajaka-cmc.png",
      vision: "Membangun komunitas solid, kompetitif, dan aktif.",
      mission:
        "Meningkatkan event internal, menguatkan talent scouting, dan membuka peluang kolaborasi eksternal.",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data.data));
  }, []);

  const submitVote = async (candidateId) => {
    const voter = sessionStorage.getItem("voter_name");

    const res = await fetch("http://localhost:5000/api/voters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voter_name: voter,
        candidate_id: candidateId,
      }),
    });

    const out = await res.json();

    if (!out.success) return alert(out.message);

    window.location.href = "/thanks";
  };

  return (
    <div className="min-h-screen bg-animated-gradient p-8">
      {/* ========== VOTING CLOSED POPUP ========== */}
      {showVotingClosedModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/10 border border-white/20 max-w-md w-full p-8 rounded-xl shadow-xl text-center animate-pop">
            <h2 className="text-white text-2xl font-bold mb-3">
              Voting Tidak Tersedia
            </h2>
            <p className="text-white/80 mb-6">
              Voting belum dimulai atau telah dihentikan oleh Admin.
            </p>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* ========== NORMAL VOTING UI ========== */}
      <h1 className="text-center text-white text-3xl font-extrabold mb-10">
        Pilih Kandidat Ketua
      </h1>

      {/* GRID CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {candidates.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCandidate(c)}
            className="relative rounded-xl overflow-hidden shadow-xl border border-white/20 h-[700px] cursor-pointer group"
          >
            <img
              src={c.image}
              className="absolute inset-0 w-full h-full object-cover duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-white text-xl font-bold">{c.name}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Kamu memilih ${c.name}!`);
                }}
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL VISI MISI */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/10 border border-white/20 p-8 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">
              {selectedCandidate.name}
            </h2>
            <p className="text-white/90 mb-3">
              <span className="font-semibold">Visi:</span>
              <br />
              {selectedCandidate.vision}
            </p>

            <div className="text-white/90 mb-6">
              <span className="font-semibold">Misi:</span>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                {selectedCandidate.mission.map((misi, index) => (
                  <li key={index}>{misi}</li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedCandidate(null)}
              className="w-full bg-blue-500/30 hover:bg-blue-500/40 text-white py-2 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
