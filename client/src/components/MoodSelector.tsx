import { motion } from "framer-motion";
import { MoodData } from "@/lib/data";

interface MoodSelectorProps {
  onSelect: (moodId: string) => void;
  moods: MoodData[];
}

export function MoodSelector({ onSelect, moods }: MoodSelectorProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (moods.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        No moods found matching your search.
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto p-4"
    >
      {moods.map((mood) => {
        const Icon = mood.icon;
        return (
          <motion.button
            key={mood.id}
            variants={item}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px currentColor" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.id)}
            className={`
              aspect-square rounded-2xl border border-white/10 
              bg-card/50 backdrop-blur-sm
              flex flex-col items-center justify-center gap-4
              text-lg md:text-xl font-bold tracking-widest uppercase
              transition-colors duration-300
              hover:bg-white/5 hover:border-white/30
              group
              ${mood.color}
            `}
            data-testid={`btn-mood-${mood.id}`}
          >
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            {mood.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
