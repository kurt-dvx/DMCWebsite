import { useState, useEffect } from "react";

const images = [
  {
    img: "https://raw.githubusercontent.com/kurt-dvx/DMC/refs/heads/master/photography.JPG",
    title: "Intro to Photography",
    desc: "Group photo of the members who attended the intro to photography workshop"
  },
  {
    img: "https://raw.githubusercontent.com/kurt-dvx/DMC/refs/heads/master/coffeeandcars.JPG",
    title: "DMC Creatives",
    desc: "Members of the DMC Executive and Creatives team at the UAS X Coffee and Cars Event."
  },
  {
    img: "https://raw.githubusercontent.com/kurt-dvx/DMC/refs/heads/master/zombies.jpg",
    title: "DMC Halloween Skit",
    desc: "Zombie actors ready for action 🎬"
  },
  {
    img: "https://raw.githubusercontent.com/kurt-dvx/DMC/refs/heads/master/GuildFest.JPG",
    title: "Guild Fest 2025",
    desc: "DMC Guild Fest Photoshoot 📸"
  },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Auto-play (optional)
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="carousel-section bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8">Gallery</h3>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={images[activeIndex].img}
              className="w-full h-[60vh] md:h-[70vh] object-contain bg-black/10"
              alt={images[activeIndex].title}
            />
          </div>
          <div className="text-center mt-4">
            <h5 className="text-xl font-bold">{images[activeIndex].title}</h5>
            <p className="text-gray-600">{images[activeIndex].desc}</p>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex ? 'bg-pink-600 w-6' : 'bg-gray-400'}`}
              />
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;