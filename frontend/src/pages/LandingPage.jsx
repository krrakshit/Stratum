import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Stratum</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#designs" className="text-gray-700 hover:text-blue-600">Designs</a>
          <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-100">
        <h2 className="text-4xl font-bold mb-4">Master Scalable System Design</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Explore detailed breakdowns of real-world systems used by top tech companies.
        </p>
        <a href="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Browse Designs
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-10 px-6 text-center">
        <h3 className="text-xl font-semibold mb-2">About This Project</h3>
        <p className="max-w-xl mx-auto text-gray-600">
          Stratum is built for engineers looking to level up their system design skills
          by exploring practical, interview-ready architectures.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center border-t mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Stratum — All rights reserved.
      </footer>
    </div>
  );
}
