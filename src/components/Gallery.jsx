import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gallery"));
        const fetchedImages = [];
        snapshot.forEach((doc) => {
          fetchedImages.push({ id: doc.id, ...doc.data() });
        });

        // Sort by Document ID (DDMMYY##)
        fetchedImages.sort((a, b) => {
          const idA = String(a.id).padStart(8, '0');
          const idB = String(b.id).padStart(8, '0');
          return idA.localeCompare(idB);
        });

        setImages(fetchedImages);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const prevSlide = () => {
    if (images.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (images.length === 0) return;
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (loading || images.length === 0) {
    return null;
  }

  const currentImage = images[activeIndex];

  return (
    <section className="carousel-section bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8">Gallery</h3>
        <div className="relative max-w-5xl mx-auto">
          {/* Image container with relative positioning for indicators */}
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={currentImage.img}
              className="w-full h-[60vh] md:h-[70vh] object-contain bg-black/10"
              alt={currentImage.title}
            />
            {/* Indicators positioned relative to the image container */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeIndex ? 'bg-pink-600 w-6' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Caption area */}
          <div className="text-center mt-4">
            <h5 className="text-xl font-bold">{currentImage.title}</h5>
            <p className="text-gray-600">{currentImage.desc}</p>
            {currentImage.link && (
              <a
                href={currentImage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-pink-600 hover:text-pink-800 font-medium"
              >
                {currentImage.linkDesc || "Access Album"} →
              </a>
            )}
          </div>

          {/* Controls (prev/next) */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition z-20"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition z-20"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;