import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Activity, Quote, ChevronLeft, PlayCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoodDisplayProps {
  mood: MoodData;
  onBack: () => void;
}

export function MoodDisplay({ mood, onBack }: MoodDisplayProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const openSong = (song: string, artist: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song + " " + artist)}`, '_blank');
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % mood.quotes.length);
  };

  const MoodIcon = mood.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto p-4 space-y-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
          className="rounded-full border-primary/50 hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4">
          <MoodIcon className={`w-10 h-10 md:w-12 md:h-12 ${mood.color}`} />
          <h2 className={`text-3xl md:text-5xl font-display font-bold uppercase ${mood.color} text-glow`}>
            When You Are {mood.label}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activities Section */}
        <Card className="bg-card/40 border-primary/20 backdrop-blur-md overflow-hidden group hover:border-primary/50 transition-colors shadow-lg shadow-black/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl text-primary">
              <Activity className="h-6 w-6" />
              Things To Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mood.activities.map((activity, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-center gap-3 text-lg text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                  {activity.text}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quote Section */}
        <Card className="bg-card/40 border-primary/20 backdrop-blur-md overflow-hidden flex flex-col justify-center relative hover:border-primary/50 transition-colors shadow-lg shadow-black/20 min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Quote className="h-32 w-32" />
          </div>
          <CardContent className="pt-6 relative z-10 flex flex-col items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.blockquote 
                key={quoteIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-light italic text-center leading-relaxed text-foreground/90 mb-8"
              >
                "{mood.quotes[quoteIndex]}"
              </motion.blockquote>
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextQuote}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2 absolute bottom-4"
            >
              <RefreshCw className="h-4 w-4" />
              New Quote
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Playlist Section */}
      <Card className="bg-card/40 border-secondary/20 backdrop-blur-md overflow-hidden hover:border-secondary/50 transition-colors shadow-lg shadow-black/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl text-secondary">
            <Music className="h-6 w-6" />
            Curated Playlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['English', 'Hindi', 'Nepali'].map((lang, sectionIdx) => (
              <div key={lang} className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground border-b border-white/10 pb-2 flex items-center justify-between">
                  {lang}
                  <span className="text-xs font-normal opacity-50">Top Hits</span>
                </h3>
                <ul className="space-y-3">
                  {mood.songs
                    .filter(s => s.lang === lang)
                    .map((song, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (sectionIdx * 0.1) + (idx * 0.05) }}
                        className="group/song flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => openSong(song.title, song.artist)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground group-hover/song:text-secondary transition-colors">
                            {song.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {song.artist}
                          </span>
                        </div>
                        <PlayCircle className="h-8 w-8 text-secondary/0 group-hover/song:text-secondary/100 transition-all transform scale-50 group-hover/song:scale-100" />
                      </motion.li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
