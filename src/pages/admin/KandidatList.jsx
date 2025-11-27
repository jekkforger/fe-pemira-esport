export default function KandidatList() {
  const list = JSON.parse(localStorage.getItem("candidates") || "[]");

  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Daftar Kandidat</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((c) => (
          <div key={c.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
            <img src={c.photo} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h3 className="text-white font-bold">{c.name}</h3>
            <p className="text-white/80 text-sm mt-1">Visi: {c.vision}</p>
            <p className="text-white/80 text-sm">Misi: {c.mission}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
