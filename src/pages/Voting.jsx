import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Voting() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votingOpen, setVotingOpen] = useState(false);
  const navigate = useNavigate();
  const [statusReady, setStatusReady] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Nabel Fardan Azyra",
      image: "/nabel.png",
      vision:
        "Menjadi pusat pengembangan ekosistem esports mahasiswa Polban yang unggul, profesional, dan berdaya saing tinggi, dengan mengintegrasikan kompetisi, pembelajaran, dan inovasi digital untuk mencetak generasi produktif dan berintegritas.",
      mission: [
        "Mendorong pembinaan dan pengembangan potensi mahasiswa melalui pelatihan teknis, manajerial, dan mentalitas.",
        "Menyelenggarakan kegiatan kompetisi internal untuk menjaring minat dan bakat lingkup kampus.",
        "Menjalin kerjasama strategis dengan pihak internal maupun eksternal kampus guna memperluas jejaring profesional dan peluang karir di dunia digital.",
        "Menyelenggarakan kompetisi skala besar sebagai wadah pengembangan prestasi.",
        "Melakukan sosialisasi edukatif pada generasi muda upaya memperluas wawasan terhadap dunia esport secara menyeluruh.",
      ],
    },
    {
      id: 2,
      name: "Kotak Kosong",
      image: "/kotak-kosong.png",
      vision: "?",
      mission: ["?"],
    },
  ];

  // 🔥 Ambil status voting dari backend
  useEffect(() => {
    const BASE = import.meta.env.VITE_API_URL;

    fetch(`${BASE}/api/status`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("voting_open", JSON.stringify(data.voting_open));
        setStatusReady(true);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Gagal memuat status",
          text: "Periksa server backend!",
          background: "#1e1e1e",
          color: "#fff",
        });
      });
  }, []);

  // ===================== CEK SAAT MASUK HALAMAN =====================
  useEffect(() => {
    if (!statusReady) return;

    const hasVoted = localStorage.getItem("hasVoted") === "true";

    if (hasVoted) {
      Swal.fire({
        icon: "info",
        title: "Kesempatan Sudah Digunakan",
        text: "Anda sudah melakukan voting sebelumnya.",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#ff7f00",
      }).then(() => navigate("/"));
      return;
    }

    const status = JSON.parse(localStorage.getItem("voting_open"));

    if (!status) {
      Swal.fire({
        icon: "warning",
        title: "Voting Belum Dibuka",
        text: "Tunggu admin membuka sesi voting.",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#ff7f00",
      }).then(() => navigate("/"));
      return;
    }

    setVotingOpen(true);
  }, [statusReady]);

  // ===================== CEK REAL-TIME ADMIN STOP =====================
  useEffect(() => {
    const BASE = import.meta.env.VITE_API_URL;

    const interval = setInterval(async () => {
      const res = await fetch(`${BASE}/api/status`);
      const { voting_open } = await res.json();

      localStorage.setItem("voting_open", JSON.stringify(voting_open));

      if (!voting_open && votingOpen) {
        setVotingOpen(false);
        Swal.fire({
          icon: "error",
          title: "Voting Ditutup",
          text: "Admin telah mengakhiri sesi voting.",
          background: "#1e1e1e",
          color: "#fff",
        }).then(() => navigate("/"));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [votingOpen]);

  // ===================== KIRIM VOTE =====================
  const submitVote = async (candidateId, candidateName) => {
    const voterName = localStorage.getItem("user_name");

    if (!voterName) {
      return Swal.fire({
        icon: "error",
        title: "Nama Tidak Ditemukan",
        text: "Silakan kembali ke halaman awal dan masukkan nama Anda.",
        confirmButtonColor: "#ff7f00",
      }).then(() => {
        window.location.href = "/";
      });
    }

    if (localStorage.getItem("hasVoted") === "true") {
      return Swal.fire({
        icon: "info",
        title: "Kesempatan Digunakan",
        text: "Kesempatan voting anda sudah digunakan.",
        confirmButtonColor: "#ff7f00",
        background: "#1e1e1e",
        color: "#fff",
      });
    }

    const confirm = await Swal.fire({
      icon: "question",
      title: "Konfirmasi Pilihan",
      text: `Yakin ingin memilih ${candidateName}?`,
      showCancelButton: true,
      confirmButtonColor: "#ff7f00",
      cancelButtonColor: "#555",
      confirmButtonText: "Ya, pilih",
      cancelButtonText: "Batal",
      background: "#1e1e1e",
      color: "#fff",
    });

    if (!confirm.isConfirmed) return;

    try {
      const BASE = import.meta.env.VITE_API_URL;

      const response = await fetch(`${BASE}/api/voters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: voterName,
          candidate_id: candidateId,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      localStorage.setItem("hasVoted", "true");

      Swal.fire({
        icon: "success",
        title: "Vote Berhasil!",
        text: `Kamu memilih ${candidateName}`,
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#ff7f00",
      }).then(() => {
        window.location.href = "/thanks";
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#ff7f00",
      });
    }
  };

  // ========== 🔥 ANTI-RENDER UI SEBELUM STATUS VALID 🔥 ==========
  if (!statusReady) return null;
  if (!votingOpen) return null;

  // =================== UI ====================
  return (
    <div className="min-h-screen bg-animated-gradient p-8">
      <h1 className="text-center text-white text-3xl font-extrabold mb-10">
        Pilih Kandidat Ketua
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {candidates.map((c) => (
          <div
            key={c.id}
            onClick={() => votingOpen && setSelectedCandidate(c)}
            className={`relative rounded-xl overflow-hidden shadow-xl border border-white/20 h-[500px] cursor-pointer group ${
              !votingOpen && "opacity-50 cursor-not-allowed"
            }`}
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 w-full h-full object-cover duration-300 group-hover:scale-105"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-white text-xl font-bold">{c.name}</h2>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  submitVote(c.id, c.name);
                }}
                disabled={!votingOpen}
                className={`mt-3 px-5 py-2 rounded-lg text-white ${
                  votingOpen
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-6 text-white/80">
        *Ketuk foto untuk melihat visi dan misi calon ketua.
      </p>

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/10 border border-white/20 max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-xl">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">
              {selectedCandidate.name}
            </h2>

            <p className="text-white/90 mb-3 leading-relaxed">
              <span className="font-semibold">Visi:</span>
              <br />
              {selectedCandidate.vision}
            </p>

            <div className="text-white/90 mb-6 leading-relaxed">
              <span className="font-semibold">Misi:</span>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                {(Array.isArray(selectedCandidate.mission)
                  ? selectedCandidate.mission
                  : [selectedCandidate.mission]
                ).map((misi, i) => (
                  <li key={i}>{misi}</li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedCandidate(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
