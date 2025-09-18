// pages/library/genre/[genre].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GenrePage() {
  const router = useRouter();
  const { genre } = router.query;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genre) return;

    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ebooks"));
        const allBooks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = allBooks.filter(
          (b) => b.genre?.toLowerCase() === genre.toLowerCase()
        );

        setBooks(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching genre books:", err);
      }
    };

    fetchBooks();
  }, [genre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 flex flex-col">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 px-6 sm:px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
          DeepEdu
        </h1>
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/library">Library</Link>
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

      {/* ===== CONTENT ===== */}
      <main className="flex-grow">
        {/* Genre Header */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 py-12 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
            {genre ? `${genre} Books` : "Loading..."}
          </h1>

              <Link
                href="/library"
                className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl shadow hover:bg-gray-50 transition text-lg font-medium flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to All Books
              </Link>
        </section>

        {/* Books Grid */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-16">
          {loading ? (
            <p className="text-center py-20">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-center py-20 text-gray-600">
              No books found in this genre.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/library/book/${book.id}`}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <div className="relative bg-gray-100" style={{ height: "253px" }}>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    {book.year && (
                      <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-lg shadow">
                        {book.year}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                    )}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </section>
      </main>

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
              <li><Link href="/library">Library</Link></li>
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
