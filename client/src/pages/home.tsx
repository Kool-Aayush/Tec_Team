import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodDisplay } from "@/components/MoodDisplay";
import { moods, teamMembers } from "@/lib/data";
import { Search, Github, Twitter, Linkedin, Target, Eye, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
          <img src="/logo.png" alt="TEC_TEAM" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-lg tracking-widest text-foreground">TEC_TEAM</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Feelings', 'About', 'Team', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home" className="pt-24 flex-1 relative z-10 flex flex-col items-center justify-center p-4 min-h-screen">
        <AnimatePresence mode="wait">
          {!currentMood ? (
            <motion.div 
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl flex flex-col items-center gap-12"
            >
              <div id="feelings" className="text-center space-y-4 pt-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Things to Do When<br />You Are <span className="border-b-4 border-primary/50 text-foreground">{typedText}<span className="animate-pulse text-primary">|</span></span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto">
                  Find tailored activities, music, and motivation for your current state of mind.
                </p>
              </div>

              <div className="relative w-full max-w-md group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="How are you feeling?"
                  className="pl-10 h-14 bg-card/50 border-primary/20 text-lg rounded-xl backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
      <section id="about" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary text-glow">About TEC_TEAM</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TEC_TEAM is a creative tech collective dedicated to the intersection of digital innovation and emotional wellness. 
              We believe technology should be a force for good, helping people navigate their feelings with empathy and style.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-card/40 border border-primary/10">
                <Target className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground">Mission</h4>
                  <p className="text-sm text-muted-foreground">To provide instant emotional support through curated digital experiences.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-xl bg-card/40 border border-secondary/10">
                <Eye className="h-6 w-6 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground">Vision</h4>
                  <p className="text-sm text-muted-foreground">A world where digital platforms prioritize mental health and wellness.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/5 flex items-center justify-center p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
            <img src="/logo.png" alt="Logo" className="w-48 h-48 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]" />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary text-glow">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic">The creative minds behind the TEC_TEAM emotional wellness platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-card/40 border border-white/5 hover:border-secondary/50 transition-all hover:-translate-y-2 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-secondary/30 p-1">
                  <img src={member.image} alt={member.name} className="w-full h-full rounded-full bg-secondary/10" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-secondary text-sm font-mono mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.description}</p>
                <div className="flex justify-center gap-4">
                  <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary text-glow">Get In Touch</h2>
            <p className="text-muted-foreground italic">Have suggestions or want to join our mission? We'd love to hear from you.</p>
          </div>
          <Card className="bg-card/40 border-primary/20 backdrop-blur-md p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input placeholder="Your Name" className="bg-background/50 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input type="email" placeholder="email@example.com" className="bg-background/50 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea placeholder="How can we help you?" className="bg-background/50 border-white/10 min-h-[150px]" />
              </div>
              <Button className="w-full h-12 text-lg uppercase tracking-widest bg-primary hover:bg-primary/80 text-primary-foreground group">
                Send Message
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-12 border-t border-white/5 bg-background text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.png" alt="TEC_TEAM" className="w-8 h-8 opacity-50" />
          <span className="font-display font-bold text-lg tracking-widest text-muted-foreground">TEC_TEAM</span>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Combining technology and emotional wellness to create a more empathetic digital world.
        </p>
        <div className="flex justify-center gap-6">
          <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
        </div>
        <p className="text-xs text-muted-foreground/50 font-mono">
          &copy; {new Date().getFullYear()} TEC_TEAM. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
