"use client";

import { useState } from "react";
import {
  HiOutlineBookOpen, HiOutlineStar, HiOutlineClock, HiOutlineBookmark,
  HiOutlineCheckCircle, HiOutlineMagnifyingGlass, HiOutlinePlay,
  HiOutlineChartBar, HiOutlineArrowRight, HiOutlineXMark,
} from "react-icons/hi2";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Books",       value: "150+", sub: "Explore now",     iconKey: "book",     color: "bg-[#7C3AED]/10 text-[#7C3AED]" },
  { label: "Currently Reading", value: "7",    sub: "Keep going!",     iconKey: "book",     color: "bg-green-100 text-green-600" },
  { label: "Completed",         value: "28",   sub: "Well done!",      iconKey: "check",    color: "bg-amber-100 text-amber-600" },
  { label: "Bookmarks",         value: "23",   sub: "Saved for later", iconKey: "bookmark", color: "bg-purple-100 text-purple-600" },
  { label: "Hours Spent",       value: "42h",  sub: "Keep learning!",  iconKey: "clock",    color: "bg-blue-100 text-blue-600" },
];

const categories = [
  { label: "Programming",    count: 45, icon: "💻", color: "bg-blue-50 text-blue-600" },
  { label: "Data Science",   count: 25, icon: "📊", color: "bg-green-50 text-green-600" },
  { label: "System Design",  count: 20, icon: "🏗",  color: "bg-orange-50 text-orange-600" },
  { label: "Interview Prep", count: 30, icon: "🎯", color: "bg-purple-50 text-purple-600" },
  { label: "Productivity",   count: 18, icon: "⚡", color: "bg-red-50 text-red-600" },
  { label: "Soft Skills",    count: 22, icon: "🧠", color: "bg-teal-50 text-teal-600" },
  { label: "Machine Learning",count:25, icon: "🤖", color: "bg-indigo-50 text-indigo-600" },
  { label: "Others",         count: 45, icon: "📁", color: "bg-gray-50 text-gray-600" },
];

const allBooks = [
  { id: 1,  title: "Clean Code",                    author: "Robert C. Martin",  category: "Programming",    rating: 4.8, pages: 464,  color: "bg-[#1a1a2e]", textColor: "text-blue-400",    desc: "A handbook of agile software craftsmanship. Learn to write clean, readable, maintainable code." },
  { id: 2,  title: "System Design Interview",        author: "Alex Xu",           category: "System Design",  rating: 4.8, pages: 309,  color: "bg-[#0f3460]", textColor: "text-cyan-300",    desc: "An insider's guide to system design interviews covering scalability, databases, and architecture." },
  { id: 3,  title: "Think Like a Programmer",        author: "V. Anton Spraul",   category: "Programming",    rating: 4.5, pages: 296,  color: "bg-[#533483]", textColor: "text-purple-200",  desc: "How to think like a programmer and solve problems creatively through programming." },
  { id: 4,  title: "Grokking Algorithms",            author: "Aditya Bhargava",   category: "DSA",            rating: 4.7, pages: 256,  color: "bg-[#2d6a4f]", textColor: "text-green-200",   desc: "An illustrated guide to algorithms with real-world examples and fun exercises." },
  { id: 5,  title: "Cracking the Coding Interview",  author: "Gayle Laakman",     category: "Interview Prep", rating: 4.8, pages: 736,  color: "bg-[#1b4332]", textColor: "text-emerald-300", desc: "189 programming questions and solutions to ace your technical interview." },
  { id: 6,  title: "Atomic Habits",                  author: "James Clear",       category: "Productivity",   rating: 4.9, pages: 320,  color: "bg-[#7c3908]", textColor: "text-orange-200",  desc: "Tiny changes, remarkable results. Learn how habits shape your identity and life." },
  { id: 7,  title: "You Don't Know JS",              author: "Kyle Simpson",      category: "JavaScript",     rating: 4.7, pages: 278,  color: "bg-[#f59e0b]", textColor: "text-black",       desc: "A deep-dive series into the core mechanisms of JavaScript. Essential for serious JS developers." },
  { id: 8,  title: "Deep Work",                      author: "Cal Newport",       category: "Productivity",   rating: 4.8, pages: 296,  color: "bg-[#1e293b]", textColor: "text-white",       desc: "Rules for focused success in a distracted world. Master the art of deep concentration." },
  { id: 9,  title: "The Clean Coder",                author: "Robert C. Martin",  category: "Programming",    rating: 4.6, pages: 256,  color: "bg-[#1e3a5f]", textColor: "text-white",       desc: "A code of conduct for professional programmers — responsibility, ethics, and craft." },
  { id: 10, title: "Designing Data-Intensive Apps",   author: "Martin Kleppmann", category: "System Design",  rating: 4.9, pages: 616,  color: "bg-[#e2e8f0]", textColor: "text-slate-800",   desc: "The big ideas behind reliable, scalable, and maintainable systems explained in depth." },
  { id: 11, title: "The 5 AM Club",                  author: "Robin Sharma",      category: "Productivity",   rating: 4.5, pages: 336,  color: "bg-[#dc2626]", textColor: "text-white",       desc: "Own your morning, elevate your life. A guide to mastering your mornings for success." },
  { id: 12, title: "The Pragmatic Programmer",       author: "David Thomas",      category: "Programming",    rating: 4.9, pages: 352,  color: "bg-[#2d1b69]", textColor: "text-white",       desc: "From journeyman to master. Timeless advice for programmers at any stage of their career." },
  { id: 13, title: "Introduction to Algorithms",     author: "Cormen et al.",     category: "DSA",            rating: 4.7, pages: 1292, color: "bg-[#1a1a2e]", textColor: "text-blue-300",    desc: "The authoritative textbook on algorithms — comprehensive, rigorous, and in-depth." },
  { id: 14, title: "The Self-Taught Programmer",     author: "Cory Althoff",      category: "Programming",    rating: 4.5, pages: 302,  color: "bg-[#14532d]", textColor: "text-green-200",   desc: "The definitive guide to programming professionally without a CS degree." },
  { id: 15, title: "Soft Skills",                    author: "John Sonmez",       category: "Soft Skills",    rating: 4.4, pages: 470,  color: "bg-[#7c2d12]", textColor: "text-orange-200",  desc: "The software developer's life manual — career, productivity, finance, and fitness." },
];

const currentBook = allBooks[11]; // The Pragmatic Programmer

// ─── Chart ───────────────────────────────────────────────────────────────────
const chartData = [100, 180, 120, 250, 300, 280, 350];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...chartData);
const W = 260, H = 100;
const points = chartData.map((v, i) => `${(i / (chartData.length - 1)) * W},${H - (v / maxVal) * H}`).join(" ");

// ─── BookCard ─────────────────────────────────────────────────────────────────
function BookCard({ book, onRead }: { book: typeof allBooks[0]; onRead: () => void }) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer" onClick={onRead}>
      <div className={`w-full aspect-[3/4] ${book.color} rounded-xl flex flex-col items-center justify-center p-3 shadow-md group-hover:scale-105 group-hover:shadow-xl transition-all duration-300`}>
        <HiOutlineBookOpen className={`h-8 w-8 ${book.textColor} opacity-60 mb-2`} />
        <span className={`text-[9px] font-black ${book.textColor} text-center leading-tight`}>{book.title}</span>
      </div>
      <div>
        <p className="text-[11px] font-bold text-text-primary leading-tight truncate">{book.title}</p>
        <p className="text-[9px] text-text-secondary truncate">{book.author}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="flex items-center gap-0.5 text-[9px] font-bold text-amber-500">
            <HiOutlineStar className="h-2.5 w-2.5" />{book.rating}
          </span>
          <span className="text-[8px] font-bold text-[#7C3AED]">{book.category}</span>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onRead(); }}
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors">
        Read Book
      </button>
    </div>
  );
}

// ─── BookDetailModal ──────────────────────────────────────────────────────────
function BookDetailModal({ book, onClose }: { book: typeof allBooks[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-lg border border-border/40 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className={`${book.color} p-8 flex items-center gap-6`}>
          <div className="flex h-20 w-16 items-center justify-center rounded-xl bg-white/10 shadow-lg">
            <HiOutlineBookOpen className={`h-10 w-10 ${book.textColor}`} />
          </div>
          <div>
            <h2 className={`text-lg font-black ${book.textColor} leading-tight`}>{book.title}</h2>
            <p className={`text-sm ${book.textColor} opacity-70 mt-1`}>{book.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <HiOutlineStar className="h-3.5 w-3.5" />{book.rating}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 ${book.textColor}`}>{book.category}</span>
              <span className={`text-[10px] ${book.textColor} opacity-60`}>{book.pages} pages</span>
            </div>
          </div>
          {/* Dark visible X button */}
          <button onClick={onClose} className="ml-auto self-start flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors">
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-black text-text-primary mb-2">About this book</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{book.desc}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ label: "Pages", val: book.pages }, { label: "Rating", val: `${book.rating}/5` }, { label: "Category", val: book.category }].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-xl py-3">
                <span className="text-sm font-black text-text-primary">{s.val}</span>
                <span className="text-[10px] text-[#7C3AED] font-bold">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/30">
              <HiOutlinePlay className="h-4 w-4" /> Start Reading
            </button>
            <button className="px-4 py-3 rounded-xl border-2 border-[#7C3AED] bg-[#7C3AED]/10 hover:bg-[#7C3AED] hover:text-white text-[#7C3AED] transition-all group">
              <HiOutlineBookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AllBooksModal ────────────────────────────────────────────────────────────
function AllBooksModal({ initialCategory = "All", onClose, onRead }: { initialCategory?: string; onClose: () => void; onRead: (b: typeof allBooks[0]) => void }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const allCategories = ["All", ...Array.from(new Set(allBooks.map((b) => b.category)))];
  const filtered = allBooks.filter((b) => {
    const q = search.toLowerCase();
    return (activeCategory === "All" || b.category === activeCategory) &&
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-background rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-border/40" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h2 className="text-lg font-black text-text-primary">📚 All Books</h2>
            <p className="text-xs text-text-secondary font-medium mt-0.5">{filtered.length} books found</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-black/5 text-text-secondary hover:text-text-primary transition-colors">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-b border-border/40">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input type="text" placeholder="Search books or authors..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/40 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 text-text-primary" />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {allCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-[10px] font-bold px-3 py-2 rounded-xl transition-all ${activeCategory === cat ? "bg-[#7C3AED] text-white shadow-sm" : "bg-black/5 text-text-secondary hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto p-6 hide-scrollbar">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-4xl">📭</span>
              <p className="text-text-secondary text-sm font-medium">No books found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {filtered.map((book) => <BookCard key={book.id} book={book} onRead={() => onRead(book)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Icon lookup ─────────────────────────────────────────────────────────────
function StatIcon({ iconKey }: { iconKey: string }) {
  if (iconKey === "check")    return <HiOutlineCheckCircle className="h-6 w-6" />;
  if (iconKey === "bookmark") return <HiOutlineBookmark className="h-6 w-6" />;
  if (iconKey === "clock")    return <HiOutlineClock className="h-6 w-6" />;
  return <HiOutlineBookOpen className="h-6 w-6" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<typeof allBooks[0] | null>(null);
  const [showAll, setShowAll]           = useState(false);
  const [allModalCategory, setAllModalCategory] = useState("All");

  const openAll = (cat = "All") => { setAllModalCategory(cat); setShowAll(true); };
  const openBook = (book: typeof allBooks[0]) => { setShowAll(false); setSelectedBook(book); };

  const recentBooks  = allBooks.slice(0, 6);
  const recommended  = allBooks.slice(6, 11);

  return (
    <>
      <div className="flex flex-col gap-6 pb-12">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div key={s.label} onClick={() => openAll()} className="flex flex-col gap-3 bg-card rounded-2xl border border-border/40 shadow-sm p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}><StatIcon iconKey={s.iconKey} /></div>
              <div>
                <p className="text-[11px] font-semibold text-text-secondary">{s.label}</p>
                <p className="text-2xl font-black text-text-primary leading-tight">{s.value}</p>
                <p className="text-[10px] font-bold text-[#7C3AED] mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main 3-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Continue Reading */}
          <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-text-primary">📖 Continue Reading</h2>
              <button onClick={() => openAll()} className="text-[10px] font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3 w-3" /></button>
            </div>
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-24 h-32 ${currentBook.color} rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform`} onClick={() => openBook(currentBook)}>
                <HiOutlineBookOpen className="h-10 w-10 text-white/60" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-[13px] font-black text-text-primary leading-tight">{currentBook.title}</h3>
                <p className="text-[10px] text-text-secondary font-medium">{currentBook.author}</p>
                <div className="mt-1">
                  <div className="flex justify-between text-[10px] font-bold text-text-secondary mb-1">
                    <span>Progress</span><span className="text-[#7C3AED]">60%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] w-fit">{currentBook.category}</span>
                <button onClick={() => openBook(currentBook)} className="mt-auto flex items-center justify-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold py-2 rounded-xl transition-colors shadow-sm">
                  <HiOutlinePlay className="h-3.5 w-3.5" /> Continue Reading
                </button>
              </div>
            </div>
          </div>

          {/* Explore Categories */}
          <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-text-primary">✨ Explore Categories</h2>
              <button onClick={() => openAll()} className="text-[10px] font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3 w-3" /></button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button key={cat.label} onClick={() => openAll(cat.label)} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-black/5 transition-colors group">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</div>
                  <span className="text-[8px] font-bold text-text-primary text-center leading-tight">{cat.label}</span>
                  <span className="text-[8px] text-text-secondary">{cat.count} Books</span>
                </button>
              ))}
            </div>
          </div>

          {/* Library Stats Chart */}
          <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-text-primary flex items-center gap-2"><HiOutlineChartBar className="h-4 w-4 text-[#7C3AED]" /> Your Library Stats</h2>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED]">This Week</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ label: "Books Read", val: "5" }, { label: "Pages Read", val: "320" }, { label: "Highlights", val: "18" }].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 bg-black/5 rounded-xl py-2.5 px-1">
                  <span className="text-base font-black text-text-primary">{s.val}</span>
                  <span className="text-[9px] text-text-secondary font-medium text-center leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-full">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,${H} ${points} ${W},${H}`} fill="url(#chartGrad)" />
                <polyline points={points} fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {chartData.map((v, i) => (
                  <circle key={i} cx={(i / (chartData.length - 1)) * W} cy={H - (v / maxVal) * H} r="3.5" fill="#7C3AED" />
                ))}
                {days.map((d, i) => (
                  <text key={d} x={(i / (days.length - 1)) * W} y={H + 16} textAnchor="middle" fontSize="8" fill="#9ca3af">{d}</text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Recently Added */}
        <div className="bg-card rounded-2xl border border-border/40 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-text-primary">✨ Recently Added</h2>
            <button onClick={() => openAll()} className="text-[10px] font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3 w-3" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentBooks.map((book) => <BookCard key={book.id} book={book} onRead={() => openBook(book)} />)}
          </div>
        </div>

        {/* Recommended + Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border/40 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-text-primary">✨ Recommended for You</h2>
              <button onClick={() => openAll()} className="text-[10px] font-bold text-[#7C3AED] hover:underline flex items-center gap-1">View All <HiOutlineArrowRight className="h-3 w-3" /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {recommended.map((book) => <BookCard key={book.id} book={book} onRead={() => openBook(book)} />)}
            </div>
          </div>

          {/* Quote Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#A855F7] rounded-2xl p-6 flex flex-col items-center justify-center gap-5 text-center shadow-xl">
            <div className="text-5xl drop-shadow-lg">📚</div>
            <div>
              <p className="text-sm font-black text-white leading-snug italic drop-shadow">
                "A book is a dream that you hold in your hand."
              </p>
              <p className="text-[12px] font-bold text-white/70 mt-2">– Neil Gaiman</p>
            </div>
            <button onClick={() => openAll()} className="w-full bg-white hover:bg-white/90 text-[#7C3AED] text-[12px] font-black py-2.5 rounded-xl transition-colors shadow-md">
              Explore Library
            </button>
          </div>
        </div>
      </div>

      {/* All Books Modal */}
      {showAll && (
        <AllBooksModal
          initialCategory={allModalCategory}
          onClose={() => setShowAll(false)}
          onRead={openBook}
        />
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </>
  );
}
