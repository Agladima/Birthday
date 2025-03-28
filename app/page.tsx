"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [balloons, setBalloons] = useState<
    Array<{
      id: number;
      left: number;
      speed: number;
      size: number;
      color: string;
      start: number;
    }>
  >([]);

  useEffect(() => {
    // Initialize 30 balloons with random properties
    const initialBalloons = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      speed: 5 + Math.random() * 10,
      size: 0.5 + Math.random() * 0.7,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      start: Math.random() * 100 - 100, // Random starting position (above viewport)
    }));
    setBalloons(initialBalloons);
  }, []);

  const handlePopBalloon = (id: number) => {
    if (!poppedBalloons.includes(id)) {
      setPoppedBalloons([...poppedBalloons, id]);
      setTimeout(() => {
        setPoppedBalloons(poppedBalloons.filter((i) => i !== id));
        // Reset balloon position after pop animation
        setBalloons((prev) =>
          prev.map((b) =>
            b.id === id
              ? {
                  ...b,
                  left: Math.random() * 100,
                  start: Math.random() * 100 - 100,
                }
              : b
          )
        );
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-8 font-sans relative overflow-hidden">
      {/* Balloons all over the page */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute transition-all duration-1000 ${
            poppedBalloons.includes(balloon.id) ? "opacity-0 scale-0" : ""
          }`}
          style={{
            left: `${balloon.left}%`,
            top: `${balloon.start}%`,
            animation: `floatUp ${balloon.speed}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${balloon.size})`,
            zIndex: 10,
          }}
          onClick={() => handlePopBalloon(balloon.id)}
        >
          <div
            className="rounded-full w-10 h-12 opacity-80"
            style={{ background: balloon.color }}
          >
            <div className="absolute bottom-0 w-px h-8 bg-gray-400 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      ))}

      {/* Content container with higher z-index */}
      <div className="relative z-20">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">
            For My Amazing Best Friend
          </h1>
          <p className="text-lg text-purple-700">
            You're the best thing that ever happened to me
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {/* Photo Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ab.jpg"
                alt="Memory with best friend"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/bb.jpg"
                alt="Memory with best friend"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/bc.jpg"
                alt="Memory with best friend"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Letter Section */}
          <section className="bg-white p-8 rounded-xl shadow-md mb-12">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Dear Nigro,
            </h2>
            <p className="text-gray-700 mb-4">
              I wanted to create this little space to remind you how much you
              mean to me. Through all the laughter, the tears, and the countless
              memories we've shared, you've been my rock, my partner in crime,
              and my favorite person.
            </p>
            <p className="text-gray-700 mb-4">
              Remember when we stayed together? That's just one of the million
              reasons why I'm so grateful to have you in my life.
            </p>
            <p className="text-gray-700">
              No matter where life takes us, I'll always be here for you - just
              like you've always been there for me.
            </p>
          </section>

          {/* Friendship Quotes */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              "A real friend is one who walks in when the rest of the world walks out.",
              "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
              "Good friends are like stars. You don't always see them, but you know they're always there.",
            ].map((quote, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="italic text-gray-700">"{quote}"</p>
              </div>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-purple-700">
          <p>Made with ♥ for the world's best friend</p>
          <p className="mt-2 text-sm">Forever grateful for you</p>
        </footer>
      </div>

      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(${Math.random() * 10 - 5}deg);
          }
          100% {
            transform: translateY(120vh) rotate(${Math.random() * 20 - 10}deg);
          }
        }
      `}</style>
    </div>
  );
}
