import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="bg-animated-gradient min-h-screen flex flex-col items-center justify-center text-center text-white px-6">

      <img src="/logo.png" className="w-[150px] h-[150px] mb-6 neon-glow fade-up" />

      <h1 className="text-5xl font-extrabold mb-4 fade-up"
          style={{ animationDelay: "0.2s" }}>
        Terima Kasih!
      </h1>

      <p className="text-lg max-w-lg text-white/80 fade-up mb-8"
         style={{ animationDelay: "0.4s" }}>
        Suara kamu telah terekam. Kamu sudah berkontribusi dalam memilih Ketua UKM 
        Polban Esport. Semoga pemimpin baru membawa perubahan besar!
      </p>

      <Link to="/">
        <button className="px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-lg neon-glow fade-up"
                style={{ animationDelay: "0.6s" }}>
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}
