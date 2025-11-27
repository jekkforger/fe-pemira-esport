import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [voters, setVoters] = useState([]);
  const [votingOpen, setVotingOpen] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsed, setElapsed] = useState("00:00:00");

  // LOAD DATA
  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:5000/api/voters/summary");
      const data = await res.json();
      setVotes(data.data);
    };

    load();
    const interval = setInterval(load, 1000); // real-time 1 detik
    return () => clearInterval(interval);
  }, []);

  // TIMER BERJALAN
  useEffect(() => {
    if (!votingOpen || !startTime) return;

    const start = new Date(startTime);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - start) / 1000);

      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");

      setElapsed(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [votingOpen, startTime]);

  // MULAI VOTING
  const startVoting = () => {
    const now = new Date().toLocaleString();

    localStorage.setItem("voting_open", true);
    localStorage.setItem("voting_start_time", now);
    localStorage.removeItem("voting_end_time");

    setVotingOpen(true);
    setStartTime(now);
    setEndTime(null);
  };

  // STOP VOTING
  const stopVoting = () => {
    const now = new Date().toLocaleString();

    localStorage.setItem("voting_open", false);
    localStorage.setItem("voting_end_time", now);

    setVotingOpen(false);
    setEndTime(now);
  };

  // RESET DATA
  const resetVoting = () => {
    if (!confirm("Reset semua suara dan daftar pemilih?")) return;

    localStorage.removeItem("votes");
    localStorage.removeItem("voters");
    localStorage.removeItem("has_voted");

    setVotes({});
    setVoters([]);
  };

  return (
    <div className="min-h-screen bg-animated-gradient p-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard Admin</h1>

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

      {/* STATUS WAKTU */}
      <div className="bg-white/10 p-5 rounded-xl border border-white/20 max-w-xl mx-auto mb-10">
        <h2 className="text-xl font-bold mb-3 text-center">Status Pemilihan</h2>

        <p className="text-white/80">
          <b>Mulai:</b> {startTime || "Belum dimulai"}
        </p>

        <p className="text-white/80">
          <b>Selesai:</b> {endTime || "Belum selesai"}
        </p>

        {votingOpen && (
          <p className="text-white/90 mt-3">
            ⏳ <b>Waktu Berjalan:</b> {elapsed}
          </p>
        )}

        <p className="mt-4 text-center">
          {votingOpen ? (
            <span className="text-green-400 font-bold">
              Voting Sedang Berlangsung
            </span>
          ) : (
            <span className="text-red-300 font-bold">Voting Tidak Aktif</span>
          )}
        </p>
      </div>

      {/* TOTAL SUARA */}
      <h2 className="text-2xl font-bold mb-3">Perolehan Suara</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="bg-white/10 p-5 rounded-xl border border-white/20 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
            <p className="text-white text-lg">
              Total Suara: <b>{votes[c.id] || 0}</b>
            </p>
          </div>
        ))}
      </div>

      {/* DAFTAR PEMILIH */}
      <h2 className="text-2xl font-bold mb-3">Daftar Pemilih</h2>

      <div className="bg-white/10 p-5 rounded-xl border border-white/20 shadow-lg">
        {voters.length === 0 ? (
          <p className="text-white/70">Belum ada yang memilih.</p>
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
                  <td className="py-2">{v.name}</td>
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
