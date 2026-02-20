import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodDisplay } from "@/components/MoodDisplay";
import { moods, teamMembers } from "@/lib/data";
import { Search, Instagram, Facebook, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [currentMoodId, setCurrentMoodId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedText, setTypedText] = useState("____");
  
  const currentMood = moods.find(m => m.id === currentMoodId);
  
  const filteredMoods = moods.filter(m => 
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (currentMoodId) return;
    const words = ["Sad", "Happy", "Angry", "Lonely", "Inspired"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutId = setTimeout(type, 500);
      } else {
        timeoutId = setTimeout(type, isDeleting ? 100 : 200);
      }
    };
    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentMoodId]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentMoodId(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden bg-black selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-primary/50 transition-all overflow-hidden">
             <img src="/static/Screenshot_from_2026-02-20_11-08-34_1771565031561.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-lg tracking-widest text-white group-hover:text-primary transition-colors">TEC_TEAM</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Feelings', 'About', 'Team'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/50 hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home" className="pt-24 flex-1 relative z-10 flex flex-col items-center justify-center p-4 min-h-screen bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_70%)]" />
        
        <AnimatePresence mode="wait">
          {!currentMood ? (
            <motion.div 
              key="selector"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-5xl flex flex-col items-center gap-16 relative"
            >
              <div id="feelings" className="text-center space-y-8 pt-12">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-none"
                >
                  Things to Do When<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x px-2">
                    You Are {typedText}<span className="text-primary animate-pulse">|</span>
                  </span>
                </motion.h1>
              </div>

              <div className="relative w-full max-w-xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-500" />
                <div className="relative">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
                    <Search className="h-6 w-6" />
                  </div>
                  <Input
                    type="text"
                    placeholder="How are you feeling right now?"
                    className="pl-14 h-16 bg-white/[0.03] border-white/10 text-xl rounded-2xl backdrop-blur-xl focus-visible:ring-primary/30 focus-visible:border-primary/50 text-white placeholder:text-white/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <MoodSelector onSelect={setCurrentMoodId} moods={filteredMoods} />
            </motion.div>
          ) : (
            <MoodDisplay 
              key="display" 
              mood={currentMood} 
              onBack={() => setCurrentMoodId(null)} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight uppercase tracking-tighter">ABOUT <span className="text-primary">TEC_TEAM</span></h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              TEC_TEAM is a creative tech collective dedicated to the intersection of digital innovation and emotional wellness. 
              The goal is to combine technology and emotional wellness through music and positive support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group text-left flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">Mission</h4>
              <p className="text-white/40 leading-relaxed text-lg">To provide instant emotional support through curated digital experiences and positive interventions.</p>
            </div>
            
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group text-left flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="h-7 w-7 text-secondary" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">Vision</h4>
              <p className="text-white/40 leading-relaxed text-lg">Building a future where digital platforms prioritize mental health and human-centric design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter uppercase">OUR TEAM</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-xl font-medium tracking-wide">THE CREATIVE MINDS BEHIND TEC_TEAM.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all h-full flex flex-col items-center text-center">
                  <div className="w-28 h-28 mb-8 relative">
                    <img src={member.image} alt={member.name} className="w-full h-full rounded-2xl bg-black object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 leading-tight uppercase tracking-tight">{member.name}</h3>
                  <div className="text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">{member.role}</div>
                  <p className="text-xs text-white/30 leading-relaxed font-medium mb-8 line-clamp-4 h-16">{member.description}</p>
                  
                  <div className="mt-auto flex gap-5">
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white transition-all transform hover:scale-125">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.facebook && (
                      <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white transition-all transform hover:scale-125">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white transition-all transform hover:scale-125">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          <div className="w-24 h-24 bg-black border border-white/10 rounded-2xl flex items-center justify-center p-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <img src="/static/Screenshot_from_2026-02-20_11-08-34_1771565031561.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <span className="font-display font-black text-3xl tracking-[0.3em] text-white">TEC_TEAM</span>
            <div className="h-[1px] w-20 bg-primary/30" />
            <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.5em] max-w-md text-center">
               COMBINING TECHNOLOGY AND EMOTIONAL WELLNESS
            </p>
          </div>

          <div className="text-center space-y-4 pt-8">
            <p className="text-[10px] text-white/10 font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} TEC_TEAM. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Target(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function Eye(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
