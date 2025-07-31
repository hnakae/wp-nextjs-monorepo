"use client"; // Required for hooks like useState in child components

import { Hero } from "@/components/go-club/Hero";
import { About } from "@/components/go-club/About";
import { Meetings } from "@/components/go-club/Meetings";
import { Blog } from "@/components/go-club/Blog";
import { Contact } from "@/components/go-club/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Meetings />
      {/* <Blog /> */}
      <Contact />
    </main>
  );
}
