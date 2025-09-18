// pages/library/book/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Calendar, User, Tag, ArrowLeft } from "lucide-react";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const docRef = doc(db, "ebooks", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentBook = { id: docSnap.id, ...docSnap.data() };
          setBook(currentBook);

          // Fetch similar books
          const querySnapshot = await getDocs(collection(db, "ebooks"));
          const allBooks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filtered = allBooks.filter(
            (b) => b.genre === currentBook.genre && b.id !== currentBook.id
          );

          setSimilarBooks(filtered.slice(0, 6));
        } else {
          console.log("No such book!");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading book...</p>;
  if (!book) return <p className="text-center py-20">Book not found.</p>;

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
        {/* Book Details */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex flex-col md:flex-row gap-12">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 mx-auto md:mx-0"
          >
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-64 h-96 object-cover rounded-xl shadow-xl"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {book.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-6">
              {book.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-indigo-600" /> {book.year}
                </span>
              )}
              {book.author && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-pink-600" /> {book.author}
                </span>
              )}
              {book.genre && (
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4 text-green-600" /> {book.genre}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              {book.description || "No description available."}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {book.pdfUrl && (
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-xl shadow-lg hover:opacity-90 transition text-lg font-semibold flex items-center gap-2 w-fit"
                >
                  <BookOpen className="w-5 h-5" />
                  Download PDF
                </a>
              )}
              <Link
                href="/library"
                className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl shadow hover:bg-gray-50 transition text-lg font-medium flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to All Books
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Similar Books */}
        {similarBooks.length > 0 && (
          <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">
                Similar Books in {book.genre}
              </h2>
              <Link
                href={`/library/genre/${encodeURIComponent(book.genre)}`}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {similarBooks.map((ebook) => (
                <Link
                  key={ebook.id}
                  href={`/library/book/${ebook.id}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                  style={{ width: "190px" }}
                >
                  <div
                    className="relative bg-gray-100"
                    style={{ height: "253px" }}
                  >
                    <img
                      src={ebook.coverUrl}
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                    {ebook.year && (
                      <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-lg shadow">
                        {ebook.year}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                      {ebook.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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
