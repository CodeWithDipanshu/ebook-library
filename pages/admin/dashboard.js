// pages/admin/dashboard.js

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();

  // UI state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Ebooks list
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch ebooks
  const fetchEbooks = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "ebooks"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );

    setEbooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  // Add ebook
  const handleAddEbook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ebooks"), {
        title,
        author,
        genre,
        year: Number(year),
        description,
        coverUrl,
        pdfUrl,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setTitle("");
      setAuthor("");
      setGenre("");
      setYear("");
      setDescription("");
      setCoverUrl("");
      setPdfUrl("");

      setMessage({ type: "success", text: "✅ Ebook uploaded successfully!" });
      fetchEbooks();
      setActiveTab("ebooks");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Failed to upload ebook." });
    }
  };

  // Delete ebook
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ebooks", id));
      setMessage({ type: "success", text: "🗑️ Ebook deleted." });
      fetchEbooks();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Failed to delete ebook." });
    }
  };

  // Sidebar links
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "upload", label: "Upload Ebook" },
    { id: "ebooks", label: "Ebooks" },
    { id: "users", label: "Users" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar (responsive) */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0`}
        >
          <div className="p-6 text-2xl font-bold border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="flex-1 p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeTab === item.id
                    ? "bg-gray-800 font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={logout}
            className="m-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-800"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
            <button onClick={logout} className="text-red-600 font-semibold">
              Logout
            </button>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {message && (
              <div
                className={`mb-6 px-4 py-3 rounded-lg shadow-md text-white ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Conditional Rendering by tab */}
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to Dashboard
                </h2>
                <p className="text-gray-600">
                  Quick overview of your ebook library.
                </p>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  ➕ Upload New Ebook
                </h2>
                <form
                  onSubmit={handleAddEbook}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                  />
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200 sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Cover URL (Google Drive)"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    placeholder="PDF URL (Google Drive)"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    className="border border-gray-700 p-3 rounded-lg text-black placeholder-black focus:ring focus:ring-blue-200"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition sm:col-span-2"
                  >
                    Upload Ebook
                  </button>
                </form>
              </div>
            )}

            {activeTab === "ebooks" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    📚 Uploaded Ebooks
                  </h2>
                  <button
                    onClick={fetchEbooks}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"
                  >
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <p className="text-gray-500">Loading ebooks...</p>
                ) : ebooks.length === 0 ? (
                  <p className="text-gray-500">No ebooks uploaded yet.</p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
  {ebooks.map((book) => (
    <div
      key={book.id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition flex flex-col"
    >
      {/* Cover */}
      <div className="relative w-full aspect-[3/4] bg-gray-100">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            No Cover
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col">
        {/* Genre / Class badge */}
        {book.genre && (
          <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full w-fit mb-2">
            {book.genre}
          </span>
        )}

        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2">
          {book.title}
        </h3>

        {/* Actions */}
        <div className="flex justify-between items-center mt-auto">
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs font-medium hover:underline"
          >
            View
          </a>
          <button
            onClick={() => handleDelete(book.id)}
            className="text-red-500 text-xs font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


                )}
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  👥 Users
                </h2>
                <p className="text-gray-500">
                  User management features will be added here later.
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  ⚙️ Settings
                </h2>
                <p className="text-gray-500">
                  App settings and preferences will be managed here.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
