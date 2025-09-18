// pages/index.js
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen,
  Brain,
  HelpCircle,
  Calendar,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const faqs = [
    {
      q: "What is DeepEdu and how can it help me?",
      a: "DeepEdu is a learning platform that provides free notes, ebooks, courses, and revision guides for Class 10 students. Whether you're preparing for exams or revising topics, we simplify learning with engaging content.",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    },
    {
      q: "Are all notes and ebooks really free to download?",
      a: "Yes! All our NCERT-based notes and ebooks are completely free. We believe education should be accessible to everyone, and we make it easier for you to get what you need without any cost.",
      icon: <HelpCircle className="w-6 h-6 text-purple-600" />,
    },
    {
      q: "I find Maths and Science tough. How can DeepEdu help?",
      a: "We offer step-by-step explanations, visual notes, and short videos to break down tough concepts — especially in Maths and Science. You'll also find topic-wise practice and strategies to make them easier.",
      icon: <Brain className="w-6 h-6 text-pink-500" />,
    },
    {
      q: "Do you provide study plans or timetables?",
      a: "Yes, we create 1-week and monthly study plans based on subjects and chapters. These help you manage your time smartly and stay focused without getting overwhelmed.",
      icon: <Calendar className="w-6 h-6 text-green-600" />,
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 flex flex-col">
      {/* ====== NAVBAR ====== */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 px-6 sm:px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
          DeepEdu
        </h1>
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/library">Books</Link>
          <Link href="/batches">Batches</Link>
          <Link href="/exam">ESP Exam</Link>
        </div>
        <a
          href="https://t.me/DeepEdu_Official"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Join Telegram
        </a>
      </nav>

      {/* ====== HERO SECTION ====== */}
      <section className="relative py-24 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        <div className="max-w-xl text-center md:text-left mb-14 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
          >
            Learn Smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              DeepEdu
            </span>
          </motion.h1>
          <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-600 mb-10">
            A platform built for learners who dream big — ebooks, AI-powered
            tools, and a supportive global student community.
          </p>
          <a
            href="https://t.me/DeepEdu_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:opacity-90 transition text-lg font-medium"
          >
            Join Our Telegram →
          </a>
        </div>

        {/* Globe & Floating Icons */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto md:mx-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute inset-0"
          >
            <img src="/globe.svg" alt="Globe" className="w-full h-full opacity-80" />
          </motion.div>
          <motion.img
            src="/book-icon.svg"
            alt="Book"
            className="absolute top-6 left-8 w-12"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.img
            src="/brain-icon.svg"
            alt="AI"
            className="absolute bottom-8 right-6 w-12"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.img
            src="/cap-icon.svg"
            alt="Graduation Cap"
            className="absolute top-1/2 -left-10 w-12"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="py-24 px-6 sm:px-10 bg-white/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Why Choose DeepEdu?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Vast Ebook Library",
                desc: "Access a curated collection of ebooks across multiple subjects. Organized, beautiful, and always expanding.",
              },
              {
                title: "AI-Powered Tools",
                desc: "Personalized study recommendations and instant doubt-solving to supercharge your learning.",
              },
              {
                title: "Global Student Community",
                desc: "Connect, collaborate, and grow with students across the world in a supportive space.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow hover:shadow-xl transition flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EXPLORE EBOOKS SECTION ====== */}
      <section className="relative py-24 px-6 sm:px-10 flex flex-col md:flex-row-reverse items-center justify-between max-w-7xl mx-auto w-full">
        <div className="max-w-xl text-center md:text-left mb-14 md:mb-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight"
          >
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Ebook Library
            </span>
          </motion.h2>
          <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-600 mb-10">
            Discover ebooks across subjects with a modern, clean, and
            easy-to-browse library experience. All resources are free.
          </p>
          <Link
            href="/library"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl shadow-md hover:opacity-90 transition text-lg font-medium"
          >
            Browse Library →
          </Link>
        </div>

        {/* Book Illustration with Orbiting Icons */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto md:mx-0 flex items-center justify-center">
          {/* Central Book */}
          <BookOpen className="w-28 h-28 text-purple-600 drop-shadow-xl z-10" />

          {/* Orbit container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Brain className="w-10 h-10 text-pink-500" />
              </div>
              {/* Right */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <GraduationCap className="w-10 h-10 text-indigo-600" />
              </div>
              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <Calendar className="w-10 h-10 text-green-500" />
              </div>
              {/* Left */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <HelpCircle className="w-10 h-10 text-orange-500" />
              </div>
              {/* Diagonals */}
              <div className="absolute top-8 left-8">
                <BookOpen className="w-8 h-8 text-purple-400" />
              </div>
              <div className="absolute top-8 right-8">
                <Brain className="w-8 h-8 text-pink-400" />
              </div>
              <div className="absolute bottom-8 left-8">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="absolute bottom-8 right-8">
                <Calendar className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== FAQ SECTION ====== */}
      <section className="py-24 px-6 sm:px-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl bg-white shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                >
                  <div className="flex items-center gap-3">
                    {faq.icon}
                    <span className="font-medium text-gray-800">{faq.q}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-indigo-600 font-bold"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-600"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TELEGRAM CTA ====== */}
      <section className="py-28 text-center px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join the DeepEdu Movement
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
            Be part of something bigger — access ebooks, share knowledge, and
            learn with thousands of students worldwide in our Telegram group.
          </p>
          <a
            href="https://t.me/DeepEdu_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-medium shadow-md hover:bg-gray-100 transition text-lg"
          >
            Join Telegram →
          </a>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-gray-50 border-t border-gray-200 py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm">
          <div>
            <h3 className="font-bold mb-2 text-indigo-600">DeepEdu</h3>
            <p className="text-gray-600">
              Empowering students through ebooks, AI tools, and community.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Explore</h3>
            <ul className="space-y-1 text-gray-600">
              <li><Link href="/library">Books</Link></li>
              <li><Link href="/batches">Batches</Link></li>
              <li><Link href="/exam">ESP Exam</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Connect</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <a href="https://t.me/DeepEdu_Official" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://t.me/DeepEdu_Official" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2025 DeepEdu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
