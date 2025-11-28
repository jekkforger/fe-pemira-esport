import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [voters, setVoters] = useState([]);
  const [votingOpen, setVotingOpen] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsed, setElapsed] = useState("00:00:00");

  // ========================= LOAD DATA =========================
  useEffect(() => {
    setVotingOpen(JSON.parse(localStorage.getItem("voting_open")) || false);
    setStartTime(localStorage.getItem("voting_start_time"));
    setEndTime(localStorage.getItem("voting_end_time"));

    fetchVotes();
    fetchVoters();
  }, []);

  // ========================= TIMER =========================
  useEffect(() => {
    if (!votingOpen || !startTime) return;

    const interval = setInterval(() => {
      const start = new Date(startTime);
      const now = new Date();
      const diff = Math.floor((now - start) / 1000);

      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");

      setElapsed(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [votingOpen, startTime]);

  // ========================= REALTIME FETCH =========================
  useEffect(() => {
    fetchVotes();
    fetchVoters();

    const interval = setInterval(() => {
      fetchVotes();
      fetchVoters();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // ========================= FETCH DATA =========================
  const fetchVotes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/votes`);
      const out = await res.json();

      if (out.success) setVotes(out.data);
    } catch (err) {
      console.error("VOTES ERROR:", err);
    }
  };

  const fetchVoters = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/voters`);
      const data = await res.json();
      if (data.success) setVoters(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ========================= START VOTING =========================
  const startVoting = async () => {
    const now = new Date().toLocaleString();

    localStorage.setItem("voting_open", true);
    localStorage.setItem("voting_start_time", now);
    localStorage.removeItem("voting_end_time");

    setVotingOpen(true);
    setStartTime(now);
    setEndTime(null);

    await fetch(`${import.meta.env.VITE_API_URL}/api/voting/open`, {
      method: "POST",
    });
  };

  // ========================= STOP VOTING =========================
  const stopVoting = async () => {
    const now = new Date().toLocaleString();

    localStorage.setItem("voting_open", false);
    localStorage.setItem("voting_end_time", now);

    setVotingOpen(false);
    setEndTime(now);

    await fetch(`${import.meta.env.VITE_API_URL}/api/voting/close`, {
      method: "POST",
    });
  };

  // ========================= RESET VOTING =========================
  const resetVoting = async () => {
    const confirmReset = await Swal.fire({
      title: "Reset Voting?",
      text: "Semua data pemilih dan suara akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, reset!",
      cancelButtonText: "Batal",
      background: "#1e1e1e",
      color: "#fff",
    });

    if (!confirmReset.isConfirmed) return;

    try {
      localStorage.removeItem("votes");
      localStorage.removeItem("voters");
      localStorage.removeItem("has_voted");
      localStorage.removeItem("hasVoted");
      localStorage.removeItem("user_name");

      setVotes({});
      setVoters([]);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reset`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal reset data!");

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Voting berhasil direset.",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#ff7f00",
      });

      fetchVotes();
      fetchVoters();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err.message,
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#ff7f00",
      });
    }
  };

  // ========================= UI =========================
  return (
    <div className="min-h-screen bg-animated-gradient p-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Dashboard Admin (Realtime)
      </h1>

      {/* CONTROL BUTTONS */}
      <div className="flex gap-4 justify-center mb-8">
        {!votingOpen ? (
          <button
            onClick={startVoting}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
          >
            Mulai Pemilihan
          </button>
        ) : (
          <button
            onClick={stopVoting}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
          >
            Stop Pemilihan
          </button>
        )}

        <button
          onClick={resetVoting}
          className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
        >
          Reset Voting
        </button>
      </div>

      {/* STATUS BOX */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-8 py-6 max-w-lg mx-auto mb-10 text-center">
        <h2 className="text-xl font-bold mb-3">Status Pemilihan</h2>

        <p className="text-white/80">
          <b>Mulai:</b> {startTime || "-"}
        </p>

        <p className="text-white/80">
          <b>Selesai:</b> {endTime || (votingOpen ? "Belum selesai" : "-")}
        </p>

        <p className="mt-3 text-center">
          {votingOpen ? (
            <span className="text-green-400 font-semibold">
              Voting Sedang Berlangsung
            </span>
          ) : (
            <span className="text-red-300 font-semibold">
              Voting Belum Dimulai / Telah Selesai
            </span>
          )}
        </p>

        {votingOpen && (
          <p className="mt-2 text-blue-300 font-bold text-lg">
            ⏳ Berjalan: {elapsed}
          </p>
        )}
      </div>

      {/* VOTE COUNTS */}
      <h2 className="text-2xl font-bold mb-3">Perolehan Suara (Realtime)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {[1, 2].map((id) => (
          <div
            key={id}
            className="bg-white/10 p-5 rounded-xl border border-white/20 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Kandidat {id}</h3>
            <p className="text-white text-lg">
              Total Suara: <b>{votes[id] || 0}</b>
            </p>
          </div>
        ))}
      </div>

      {/* LIST PEMILIH */}
      <h2 className="text-2xl font-bold mb-3">Daftar Pemilih (Realtime)</h2>
      <div className="bg-white/10 p-5 rounded-xl border border-white/20 shadow-lg">
        {voters.length === 0 ? (
          <p className="text-white/70">Belum ada pemilih.</p>
        ) : (
          <table className="w-full text-left text-white">
            <thead>
              <tr className="opacity-70 border-b border-white/20">
                <th className="py-2">Nama</th>
                <th>Kandidat</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((v, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="py-2">{v.voter_name}</td>
                  <td>{v.candidate_name}</td>
                  <td>{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
