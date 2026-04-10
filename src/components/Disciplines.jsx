const disciplines = [
  {
    title: "Graphic Design",
    subtitle: "Visual Communication",
    description: "Learn the principles of visual communication through typography, color theory, and layout design. Our workshops cover tools like Adobe Photoshop, Illustrator, and Canva to create stunning visuals for social media, branding, and print materials. Perfect for beginners wanting to learn design fundamentals or experienced designers looking to refine their skills.",
    session: "Upcoming Sessions: Visual Vibes",
    img: "https://digitalauxilius.com/wp-content/uploads/2022/02/graphic.jpg",
    reverse: false,
  },
  {
    title: "Photography",
    subtitle: "Capturing Moments",
    description: "Master the art of photography from camera basics to advanced techniques. Learn about composition, lighting, exposure, and post-processing. Whether you're using a DSLR, mirrorless camera, or smartphone, we'll help you capture professional-quality images. Join our photo walks and studio sessions to practice and get feedback from experienced photographers.",
    session: "Upcoming Sessions: Studio Field Trip",
    img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    reverse: true,
  },
  {
    title: "Videography",
    subtitle: "Storytelling in Motion",
    description: "From planning to production and post-production, learn how to create compelling video content. Our sessions cover scripting, shooting techniques, lighting for video, and editing with software like Adobe Premiere Pro and DaVinci Resolve. Perfect for creating YouTube content, short films, documentaries, or social media videos.",
    session: "Past Session: Editing with Premiere Pro",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    reverse: false,
  },
  {
    title: "Digital Art & Illustration",
    subtitle: "Creative Expression",
    description: "Explore the world of digital painting, character design, and illustration using tools like Procreate, Adobe Fresco, and Clip Studio Paint. Learn about digital brushes, layers, color palettes, and creating artwork from concept to completion. Whether you're into character design, concept art, or digital painting, this discipline unleashes your creative potential.",
    session: "Past Sessions: Pixel Art Workshop",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    reverse: true,
  },
  {
    title: "Audio Production",
    subtitle: "Sound Design & Music",
    description: "Dive into the world of sound with our audio production workshops. Learn about recording techniques, mixing, mastering, and sound design using software like Ableton Live, FL Studio, and Adobe Audition. Perfect for podcasters, musicians, filmmakers, or anyone interested in creating professional-quality audio content.",
    session: "Past Session: Audio Production Workshop",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    reverse: false,
  },
];

const Disciplines = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <hr className="featurette-divider" />
        <h3 className="text-3xl font-bold text-center mb-4">
          Our Core <span className="text-gray-500">Disciplines</span>
        </h3>
        <hr className="featurette-divider" />

        {disciplines.map((item, idx) => (
          <div key={idx}>
            <div className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16`}>
              <div className="md:w-7/12">
                <h4 className="featurette-heading mb-2">
                  {item.title} <span className="text-gray-500">{item.subtitle}</span>
                </h4>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <p><strong>{item.session}</strong></p>
              </div>
              <div className="md:w-5/12">
                <img className="featurette-image" src={item.img} alt={item.title} />
              </div>
            </div>
            {idx < disciplines.length - 1 && <hr className="featurette-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Disciplines;