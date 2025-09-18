// pages/library.js
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  BookOpen,
  Brain,
  GraduationCap,
  HelpCircle,
  Calendar,
} from "lucide-react";

export default function Library() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ebooks"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEbooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ebooks:", err);
      }
    };
    fetchEbooks();
  }, []);

  // Group books by genre
  const genres = ebooks.reduce((acc, ebook) => {
    if (!acc[ebook.genre]) acc[ebook.genre] = [];
    acc[ebook.genre].push(ebook);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 flex flex-col">
      {/* ===== NAVBAR ===== */}
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

      {/* ===== HERO ===== */}
      <section className="relative py-20 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        <div className="max-w-xl text-center md:text-left mb-14 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight"
          >
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Ebook Library
            </span>
          </motion.h1>
          <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-600 mb-10">
            Free access to curated ebooks across subjects. Beautifully designed,
            easy to browse, and always expanding.
          </p>
        </div>

        {/* Orbit Illustration */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto md:mx-0 flex items-center justify-center">
          <BookOpen className="w-28 h-28 text-purple-600 drop-shadow-xl z-10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Brain className="w-10 h-10 text-pink-500" />
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <GraduationCap className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <Calendar className="w-10 h-10 text-green-500" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <HelpCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== GENRE SECTIONS ===== */}
      <section className="py-16 px-6 sm:px-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <p className="text-center text-gray-600">Loading ebooks...</p>
        ) : Object.keys(genres).length === 0 ? (
          <p className="text-center text-gray-600">No ebooks available yet.</p>
        ) : (
          Object.keys(genres).map((genre) => (
            <div key={genre} className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
                  {genre}
                </h2>
                <Link
                  href={`/library/genre/${encodeURIComponent(genre)}`}
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  View All →
                </Link>
              </div>

              {/* Horizontal Scroll Row */}
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                {genres[genre].slice(0, 6).map((ebook) => (
                  <Link
                    key={ebook.id}
                    href={`/library/book/${ebook.id}`}
                    className="flex-shrink-0 bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                    style={{ width: "190px" }}
                  >
                    {/* Cover */}
                    <div className="relative bg-gray-100" style={{ height: "253px" }}>
                      <img
                        src={ebook.coverUrl}
                        alt={ebook.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Year Badge */}
                      {ebook.year && (
                        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-lg shadow">
                          {ebook.year}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                        {ebook.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* ===== FOOTER ===== */}
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
