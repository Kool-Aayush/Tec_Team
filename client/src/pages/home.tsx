import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodDisplay } from "@/components/MoodDisplay";
import { moods, teamMembers } from "@/lib/data";
import { Search, Instagram, Facebook, Linkedin, Target, Eye, Mail, Twitter } from "lucide-react";
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
             <span className="text-white font-display font-black text-xs">TT</span>
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
                <p className="text-white/40 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto uppercase">
                  EMOTIONAL INTELLIGENCE THROUGH DIGITAL INNOVATION
                </p>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-[0.3em] uppercase">
              Our Legacy
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">THE ART OF <br/><span className="text-primary">WELLNESS.</span></h2>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              TEC_TEAM represents a paradigm shift in emotional support. We architect digital sanctuaries where data meets empathy, providing a modern response to the complexities of human emotion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Target className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">The Mission</h4>
                <p className="text-sm text-white/40 leading-relaxed">Pioneering instant, AI-aware emotional interventions through high-fidelity digital art and curated experiences.</p>
              </div>
              <div className="space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">The Vision</h4>
                <p className="text-sm text-white/40 leading-relaxed">Setting the global standard for mental wellness integration in everyday technology interfaces.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/5 flex items-center justify-center p-12 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative w-64 h-64 bg-black rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
               <img src="/logo.png" alt="Logo" className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-bold tracking-[0.3em] uppercase">
              Architects
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-black text-white">TEC_TEAM <span className="text-secondary">ELITE</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium">The visionaries behind the next generation of emotional technology.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-b from-transparent to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all h-full flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary animate-spin-slow opacity-20 group-hover:opacity-50" />
                    <img src={member.image} alt={member.name} className="relative w-full h-full rounded-full bg-black p-1 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 leading-tight">{member.name}</h3>
                  <div className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4 bg-primary/10 px-3 py-1 rounded-full">{member.role}</div>
                  <p className="text-sm text-white/40 leading-relaxed font-medium mb-8 line-clamp-4">{member.description}</p>
                  
                  <div className="mt-auto flex gap-5">
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-white/20 hover:text-primary transition-all scale-100 hover:scale-125">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.facebook && (
                      <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="text-white/20 hover:text-primary transition-all scale-100 hover:scale-125">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-white/20 hover:text-primary transition-all scale-100 hover:scale-125">
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
      <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('home')}>
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2 border border-white/10 group-hover:border-primary transition-colors">
                <span className="text-white font-display font-black text-sm">TT</span>
             </div>
             <span className="font-display font-bold text-2xl tracking-[0.2em] text-white">TEC_TEAM</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Home', 'Feelings', 'About', 'Team'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex gap-8">
            <Mail className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
              ENGINEERED FOR HUMAN EMOTION
            </p>
            <p className="text-[10px] text-white/10 font-mono">
              &copy; {new Date().getFullYear()} TEC_TEAM LABS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
