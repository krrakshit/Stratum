"use client";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import Link from "next/link";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Browse",
    },
    {
      text: "System",
    },
    {
      text: "Design",
    },
    {
      text: "concepts with",
    },
    {
      text: "Stratum.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to System Design starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/blog">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
}
