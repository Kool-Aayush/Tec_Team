import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodDisplay } from "@/components/MoodDisplay";
import { moods, MoodData } from "@/lib/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [currentMoodId, setCurrentMoodId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typedText, setTypedText] = useState("____");
  
  const currentMood = moods.find(m => m.id === currentMoodId);
  
  // Filter moods based on search
  const filteredMoods = moods.filter(m => 
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Typing effect
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
        timeoutId = setTimeout(type, 2000); // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutId = setTimeout(type, 500); // Pause before new word
      } else {
        timeoutId = setTimeout(type, isDeleting ? 100 : 200);
      }
    };

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentMoodId]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("lastMood");
    if (saved && moods.find(m => m.id === saved)) {
      setCurrentMoodId(saved);
    }
  }, []);

  const handleSelectMood = (id: string) => {
    setCurrentMoodId(id);
    localStorage.setItem("lastMood", id);
    setSearchQuery(""); 
  };

  const handleBack = () => {
    setCurrentMoodId(null);
    localStorage.removeItem("lastMood");
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header / Logo Area */}
      <header className="relative z-10 w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="TEC_TEAM" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          <span className="font-display font-bold text-xl tracking-widest text-foreground">
            TEC_TEAM
          </span>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!currentMood ? (
            <motion.div 
              key="selector"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl flex flex-col items-center gap-12"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  Things to Do When<br />You Are <span className="border-b-4 border-primary/50 text-foreground min-w-[2ch] inline-block">{typedText}<span className="animate-pulse text-primary">|</span></span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto">
                  Select your feeling or type it below to get curated activities, music, and motivation.
                </p>
              </div>

              {/* Search / Type Input */}
              <div className="relative w-full max-w-md group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="How are you feeling? (e.g. Happy, Sad...)"
                  className="pl-10 h-14 bg-background/50 border-primary/30 text-lg focus-visible:ring-primary/50 focus-visible:border-primary rounded-xl backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <MoodSelector onSelect={handleSelectMood} moods={filteredMoods} />
            </motion.div>
          ) : (
            <MoodDisplay 
              key="display" 
              mood={currentMood} 
              onBack={handleBack} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 p-6 text-center text-muted-foreground text-sm font-mono">
        &copy; {new Date().getFullYear()} TEC_TEAM. Designed for the Future.
      </footer>
    </div>
  );
}
