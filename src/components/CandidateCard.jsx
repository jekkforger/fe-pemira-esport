export default function CandidateCard({ data }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 
                    shadow-lg hover:shadow-[0_0_25px_#40c9ff] 
                    transition hover:scale-[1.02] cursor-pointer neon-glow">

      <img
        src={data.photo}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-bold mb-1">{data.name}</h2>
      <p className="text-white/70 text-sm">{data.vision}</p>
    </div>
  );
}
