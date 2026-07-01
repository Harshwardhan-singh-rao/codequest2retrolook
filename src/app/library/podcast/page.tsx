
import { HiOutlineSpeakerWave, HiOutlineClock, HiOutlinePlayCircle } from "react-icons/hi2";

const podcasts = [
  { id: 1, title: "CodeNewbie", host: "Saron Yitbarek", desc: "Stories and interviews from people on their coding journey", episodes: 580, duration: "45 min avg", color: "bg-purple-100 text-purple-600", tag: "Beginner" },
  { id: 2, title: "Syntax.fm", host: "Wes Bos & Scott Tolinski", desc: "Tasty web development treats — modern JS, CSS, and tools", episodes: 750, duration: "60 min avg", color: "bg-yellow-100 text-yellow-600", tag: "Web Dev" },
  { id: 3, title: "Software Engineering Daily", host: "Jeff Meyerson", desc: "Deep technical interviews on software topics daily", episodes: 2000, duration: "55 min avg", color: "bg-blue-100 text-blue-600", tag: "Engineering" },
  { id: 4, title: "Lex Fridman Podcast", host: "Lex Fridman", desc: "AI, science, philosophy and the meaning of life with brilliant minds", episodes: 430, duration: "180 min avg", color: "bg-gray-100 text-gray-600", tag: "AI & Tech" },
  { id: 5, title: "Data Skeptic", host: "Kyle Polich", desc: "Data science, statistics, machine learning and AI topics", episodes: 500, duration: "30 min avg", color: "bg-green-100 text-green-600", tag: "Data Science" },
  { id: 6, title: "The freeCodeCamp Podcast", host: "Quincy Larson", desc: "Inspiring stories of people learning to code and changing their careers", episodes: 130, duration: "35 min avg", color: "bg-orange-100 text-orange-600", tag: "Career" },
  { id: 7, title: "Command Line Heroes", host: "Saron Yitbarek", desc: "Epic true tales of developers and tech innovators who changed the world", episodes: 90, duration: "25 min avg", color: "bg-red-100 text-red-600", tag: "History" },
  { id: 8, title: "JS Party", host: "Changelog Media", desc: "Weekly celebration of JavaScript and the web", episodes: 320, duration: "50 min avg", color: "bg-teal-100 text-teal-600", tag: "JavaScript" },
];

export default function PodcastPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Featured Banner */}
      <div className="flex items-center gap-5 bg-gradient-to-r from-[#7C3AED]/20 to-[#7C3AED]/5 border border-[#7C3AED]/30 rounded-2xl p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]">
          <HiOutlineSpeakerWave className="h-7 w-7 text-white" />
        </div>
        <div>
          <h2 className="text-base font-black text-text-primary">🎙️ Recommended This Week</h2>
          <p className="text-sm text-text-primary/80 font-medium mt-0.5">Syntax.fm – Ep. 750: The State of JavaScript 2024</p>
        </div>
        <button className="ml-auto flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0">
          <HiOutlinePlayCircle className="h-4 w-4" /> Play Now
        </button>
      </div>

      {/* Podcast Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {podcasts.map((pod) => (
          <div key={pod.id} className="flex flex-col bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer">
            {/* Cover */}
            <div className={`flex items-center justify-center h-32 ${pod.color} relative`}>
              <HiOutlineSpeakerWave className="h-12 w-12 opacity-25" />
              <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full bg-white/70 text-text-primary">{pod.tag}</span>
            </div>
            {/* Info */}
            <div className="flex flex-col gap-2 p-4 flex-1">
              <h3 className="text-sm font-black text-text-primary leading-tight group-hover:text-[#7C3AED] transition-colors">{pod.title}</h3>
              <p className="text-[10px] font-bold text-text-secondary">by {pod.host}</p>
              <p className="text-[10px] text-text-secondary leading-relaxed">{pod.desc}</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium">
                  🎧 {pod.episodes} eps
                </span>
                <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium">
                  <HiOutlineClock className="h-3 w-3" /> {pod.duration}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button className="w-full flex items-center justify-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold py-2 rounded-xl transition-colors">
                <HiOutlinePlayCircle className="h-3.5 w-3.5" /> Listen Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
