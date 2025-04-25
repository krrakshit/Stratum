"use client";
import React, { useState } from "react";
import { IconCloudDemo } from "../components/SkillCloud";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";

type CodeIconProps = React.SVGProps<SVGSVGElement>;

function CodeIcon(props: CodeIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <header className="w-full px-6 lg:px-24 py-4 flex items-center justify-between shadow-md">
        {/* Logo */}
        <h1 className="text-2xl font-bold">STRATUM</h1>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6">
          <a href="#" className="hover:text-primary">Home</a>
          <a href="#" className="hover:text-primary">Designs</a>
          <a href="#" className="hover:text-primary">About</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </nav>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="hidden lg:block p-2 rounded-lg transition">
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="lg:hidden flex flex-col items-center bg-gray-100 p-4">
          <a href="#" className="py-2">Home</a>
          <a href="#" className="py-2">Designs</a>
          <a href="#" className="py-2">About</a>
          <a href="#" className="py-2">Contact</a>
        </nav>
      )}

      <section className="flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-24 py-12">
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold">Explore System Design Concepts</h1>
          <p className="text-gray-600 mt-4">
            A curated collection of system design patterns, architectures, and real-world case studies.
          </p>
          <Link href="/blog">
          <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-opacity-90 transition">
            Browse Designs
          </button>
          </Link>
          
        </div>

        {/* Right Section - Skills Cloud */}
        <div className="flex flex-col items-center justify-center mt-10 lg:mt-0">
          <CodeIcon className="w-8 h-8 text-primary animate-[pulse_2s_ease-in-out_infinite]" />
          <div className="w-full flex justify-center mt-6">
            <IconCloudDemo />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
