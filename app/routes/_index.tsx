import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";

function Index() {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play background music with loop
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.1;
      backgroundMusicRef.current.play();
    }
  }, []);

  const playSound = (soundPath: string) => {
    const sound = new Audio(soundPath);
    sound.volume = 0.1;
    sound.play();
  };

  return (
    <div className="relative text-center mb-10">
      {/* Background Music */}
      <audio ref={backgroundMusicRef} src="/sounds/background-music.mp3" />

      {/* Sound Reactive Visualizer in Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-400 to-indigo-600">
        <div className="sound-visualizer h-48 bg-opacity-50 animate-pulse"></div>
        <h2 className="text-5xl font-extrabold text-white mt-4">Experience Sound Like Never Before</h2>
        <p className="text-xl text-white mb-8">
          At Sound Source, we bring immersive audio experiences to life.
        </p>
        <Link to="/about" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105">
          Learn More About Us
        </Link>
      </section>

      {/* Feature Highlights with 3D Rotating Cards */}
      <section className="container mx-auto mt-16">
        <h3 className="text-3xl font-bold text-orange-600 mb-8">Why Choose Sound Source?</h3>
        <div className="grid gap-6 md:grid-cols-3 text-gray-700">
          {["Cutting-Edge Technology", "Unmatched Quality", "Customer-Centric"].map((feature) => (
            <div key={feature} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-2 transition">
              <h4 className="text-2xl font-bold text-orange-600 mb-2">{feature}</h4>
              <p>Experience unparalleled sound quality with our advanced audio technology.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sound Journey Section with Narrated Soundscapes */}
      <section className="container mx-auto mt-16 mb-10 text-left">
        <h3 className="text-3xl font-bold text-orange-600 mb-8 text-center">Sound Journey</h3>
        <div className="grid gap-6 md:grid-cols-2 text-gray-700">
          {[
            { title: "City Life", sound: "/sounds/city.mp3", description: "Feel the vibrant sounds of the city." },
            { title: "Nature", sound: "/sounds/nature.mp3", description: "Immerse yourself in soothing nature sounds." },
            { title: "Music", sound: "/sounds/music.mp3", description: "Experience the beauty of harmonious music." },
          ].map(({ title, sound, description }) => (
            <div
              key={title}
              className="p-6 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
              onMouseEnter={() => playSound(sound)}
            >
              <h4 className="text-2xl font-bold text-orange-600 mb-2">{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Index;
