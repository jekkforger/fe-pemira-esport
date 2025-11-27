export default function Gallery() {
  const images = [
    "/jajaka-oppo.png",
    "/jajaka-cmc.png",
    "/jajaka-eat.png",
    "/jajaka-mechup.png",
  ];

  return (
    <div className="min-h-screen bg-animated-gradient p-8">
      <h1 className="text-center text-white text-3xl md:text-4xl font-extrabold mb-10">
        Galeri Prestasi Polban Esport
      </h1>

      <div className="grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5
        gap-4 
        max-w-7xl mx-auto"
      >
        {images.map((img, i) => (
          <div key={i} className="group relative">
            <img
              src={img}
              className="w-full h-40 md:h-52 object-cover rounded-xl shadow-xl 
                         group-hover:scale-105 transition duration-300"
            />

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 
                            group-hover:opacity-100 transition flex items-center 
                            justify-center text-white text-sm">
              Lihat Prestasi
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
