import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

function Index() {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [currentSound, setCurrentSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.1;
    }
  }, []);

  const playSound = (soundPath: string) => {
    // Pause any currently playing sound
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0; // Reset the current sound
    }

    // Play the new sound
    const newSound = new Audio(soundPath);
    newSound.volume = 0.1;
    newSound.play().catch((error) => console.error("Playback failed:", error));

    // Set the new sound as the current one
    setCurrentSound(newSound);
  };

  return (
    <div className="relative text-center mb-10">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center text-white">
        <h2 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Experience Sound Like Never Before
        </h2>
        <p className="text-2xl mb-8 drop-shadow-md">
          At Sound Source, we bring immersive audio experiences to life.
        </p>
        <Link
          to="/about"
          className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-transform transform hover:scale-110 shadow-lg hover:shadow-2xl"
        >
          Learn More About Us
        </Link>
      </section>

      {/* Feature Highlights with Cards */}
      <section className="container mx-auto mt-16">
        <h3 className="text-3xl font-bold text-orange-600 mb-8">Why Choose Sound Source?</h3>
        <div className="grid gap-6 md:grid-cols-3 text-gray-700">
          {["Cutting-Edge Technology", "Unmatched Quality", "Customer-Centric"].map((feature) => (
            <div key={feature} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
              <h4 className="text-2xl font-bold text-orange-600 mb-2">{feature}</h4>
              <p>Experience unparalleled sound quality with our advanced audio technology.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sound Journey Section */}
      <section className="container mx-auto mt-16 mb-10 text-left p-10 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 shadow-lg">
        <h3 className="text-3xl font-bold text-orange-600 mb-8 text-center">Sound Journey</h3>
        <div className="grid gap-6 md:grid-cols-3 text-gray-700">
          {[
            { title: "City Life", sound: "/app/routes/sounds/city.mp3", description: "Feel the vibrant sounds of the city.", icon: "🌆" },
            { title: "Nature", sound: "/app/routes/sounds/nature.mp3", description: "Immerse yourself in soothing nature sounds.", icon: "🌲" },
            { title: "Music", sound: "/app/routes/sounds/music.mp3", description: "Experience the beauty of harmonious music.", icon: "🎶" },
          ].map(({ title, sound, description, icon }) => (
            <div
              key={title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer flex flex-col items-center text-center"
              onClick={() => playSound(sound)} // Play the clicked sound
            >
              <div className="text-5xl mb-4">{icon}</div> {/* Icon */}
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