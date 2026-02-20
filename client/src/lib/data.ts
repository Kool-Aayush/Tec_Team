import { 
  CloudRain, 
  Flame, 
  Sun, 
  Moon, 
  Activity, 
  Brain, 
  BatteryLow, 
  HelpCircle,
  LucideIcon,
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react";

export interface Song {
  title: string;
  artist: string;
  lang: 'English' | 'Hindi' | 'Nepali';
  url?: string;
}

export interface ActivityItem {
  text: string;
}

export interface Member {
  name: string;
  role: string;
  description: string;
  image: string;
  socials: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface MoodData {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  activities: ActivityItem[];
  quotes: string[];
  songs: Song[];
}

export const teamMembers: Member[] = [
  {
    name: "Aayush Rajbhandari",
    role: "Frontend Developer",
    description: "Overall development of the platform and frontend architecture.",
    image: "/static/Screenshot_from_2026-02-20_10-47-39_1771564766664.png",
    socials: { 
      instagram: "https://www.instagram.com/rajbhandariayush/", 
      linkedin: "https://www.linkedin.com/in/aayush-rajbhandari-2b7521399/" 
    }
  },
  {
    name: "Aadesh Raj Gurung",
    role: "UI Auditor",
    description: "Responsible for rating, seeing interfaces, and providing tips.",
    image: "/static/Screenshot_from_2026-02-20_10-48-07_1771564775279.png",
    socials: { 
      instagram: "https://www.instagram.com/_argrg/" 
    }
  },
  {
    name: "Prerana Rajbanshi",
    role: "Content Lead",
    description: "Curating content, information, and high-quality prompts.",
    image: "/static/Screenshot_from_2026-02-20_11-11-30_1771565215994.png",
    socials: { 
      facebook: "https://www.facebook.com/prerana.rajbanshi" 
    }
  },
  {
    name: "Anmol Bista",
    role: "Design Modeler",
    description: "Overall rating, modeling, and physical wireframe design.",
    image: "/static/Screenshot_from_2026-02-20_10-48-25_1771564794145.png",
    socials: { 
      instagram: "https://www.instagram.com/anmolbista7771/" 
    }
  },
  {
    name: "Vision Bohara",
    role: "Quality Assurance",
    description: "Overall rating and project validation.",
    image: "/static/Screenshot_from_2026-02-20_10-48-46_1771564805609.png",
    socials: { 
      facebook: "https://www.facebook.com/vision.bohara7" 
    }
  }
];

export const moods: MoodData[] = [
  {
    id: 'sad',
    label: 'Sad',
    color: 'text-blue-400',
    icon: CloudRain,
    activities: [
      { text: 'Listen to calming music' },
      { text: 'Journal your feelings' },
      { text: 'Talk to someone close' },
      { text: 'Watch comfort videos' },
      { text: 'Take a warm shower' }
    ],
    quotes: [
      "Tears are words the heart can't express. Let them flow, then let them go.",
      "This too shall pass.",
      "It's okay not to be okay.",
      "Every storm runs out of rain."
    ],
    songs: [
      { title: 'The Night We Met', artist: 'Lord Huron', lang: 'English' },
      { title: 'Fix You', artist: 'Coldplay', lang: 'English' },
      { title: 'Tum Se Hi', artist: 'Mohit Chauhan', lang: 'Hindi' },
      { title: 'Kabira', artist: 'Tochi Raina', lang: 'Hindi' },
      { title: 'Phulbutte Sari', artist: 'Marvel', lang: 'Nepali' },
      { title: 'Parelima', artist: '1974 AD', lang: 'Nepali' }
    ]
  },
  {
    id: 'angry',
    label: 'Angry',
    color: 'text-red-500',
    icon: Flame,
    activities: [
      { text: 'Deep breathing exercises (4-7-8)' },
      { text: 'Intense workout or run' },
      { text: 'Listen to energetic music' },
      { text: 'Write down what you feel, then tear it up' },
      { text: 'Count backwards from 100' }
    ],
    quotes: [
      "For every minute you remain angry, you give up sixty seconds of peace of mind.",
      "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
      "Speak when you are angry and you will make the best speech you will ever regret.",
      "Hold your peace."
    ],
    songs: [
      { title: 'Natural', artist: 'Imagine Dragons', lang: 'English' },
      { title: 'Thunder', artist: 'Imagine Dragons', lang: 'English' },
      { title: 'Zinda', artist: 'Siddharth Mahadevan', lang: 'Hindi' },
      { title: 'Kar Har Maidaan Fateh', artist: 'Sukhwinder Singh', lang: 'Hindi' },
      { title: 'Aago', artist: 'Cobweb', lang: 'Nepali' },
      { title: 'Hamro Nepal Ma', artist: 'Neetesh Jung Kunwar', lang: 'Nepali' }
    ]
  },
  {
    id: 'happy',
    label: 'Happy',
    color: 'text-yellow-400',
    icon: Sun,
    activities: [
      { text: 'Dance like nobody is watching' },
      { text: 'Share your positivity with a friend' },
      { text: 'Celebrate your small wins' },
      { text: 'Take a selfie' },
      { text: 'Cook your favorite meal' }
    ],
    quotes: [
      "Happiness is not something ready made. It comes from your own actions.",
      "The most wasted of all days is one without laughter.",
      "Count your age by friends, not years. Count your life by smiles, not tears.",
      "Enjoy the little things."
    ],
    songs: [
      { title: 'Better When I\'m Dancin\'', artist: 'Meghan Trainor', lang: 'English' },
      { title: 'Happy', artist: 'Pharrell Williams', lang: 'English' },
      { title: 'Mast Magan', artist: 'Arijit Singh', lang: 'Hindi' },
      { title: 'Uff Teri Ada', artist: 'Shankar Mahadevan', lang: 'Hindi' },
      { title: 'Kutu Ma Kutu', artist: 'Rajan Raj Siwakoti', lang: 'Nepali' },
      { title: 'Maya Luki Luki', artist: 'Tika Prasain', lang: 'Nepali' }
    ]
  },
  {
    id: 'lonely',
    label: 'Lonely',
    color: 'text-indigo-400',
    icon: Moon,
    activities: [
      { text: 'Read a book' },
      { text: 'Call an old friend' },
      { text: 'Go for a walk in nature' },
      { text: 'Adopt a hobby' },
      { text: 'Volunteer online' }
    ],
    quotes: [
      "Loneliness adds beauty to life. It puts a special burn on sunsets and makes night air smell better.",
      "You are never alone. You are eternally connected with everyone.",
      "The soul that sees beauty may sometimes walk alone.",
      "Embrace your own company."
    ],
    songs: [
      { title: 'Hold On', artist: 'Justin Bieber', lang: 'English' },
      { title: 'Be Kind', artist: 'Halsey', lang: 'English' },
      { title: 'Tujhe Kitna Chahne Lage', artist: 'Arijit Singh', lang: 'Hindi' },
      { title: 'Phir Le Aya Dil', artist: 'Arijit Singh', lang: 'Hindi' },
      { title: 'Syndicate', artist: 'Bipul Chettri', lang: 'Nepali' },
      { title: 'Bistarai Bistarai', artist: 'Rohit John Chettri', lang: 'Nepali' }
    ]
  },
  {
    id: 'stressed',
    label: 'Stressed',
    color: 'text-orange-400',
    icon: Activity,
    activities: [
      { text: 'Practice mindfulness meditation' },
      { text: 'Drink herbal tea' },
      { text: 'Disconnect from screens for 1 hour' },
      { text: 'Stretch your body' },
      { text: 'Clean your workspace' }
    ],
    quotes: [
      "It’s not stress that kills us, it is our reaction to it.",
      "Breath is the power behind all things. I breathe in and know that good things will happen.",
      "Calmness is the cradle of power.",
      "Slow down."
    ],
    songs: [
      { title: 'Weightless', artist: 'Marconi Union', lang: 'English' },
      { title: 'Holocene', artist: 'Bon Iver', lang: 'English' },
      { title: 'Kun Faya Kun', artist: 'A.R. Rahman', lang: 'Hindi' },
      { title: 'Iktara', artist: 'Kavita Seth', lang: 'Hindi' },
      { title: 'Mero Mana Ma', artist: 'Sushant KC', lang: 'Nepali' },
      { title: 'Resham Firiri', artist: 'Traditional', lang: 'Nepali' }
    ]
  },
  {
    id: 'overthinking',
    label: 'Overthinking',
    color: 'text-purple-400',
    icon: Brain,
    activities: [
      { text: 'Write down your thoughts' },
      { text: 'Focus on what you can control' },
      { text: 'Do a puzzle or Sudoku' },
      { text: 'Watch a complex movie' },
      { text: 'Draw or doodle' }
    ],
    quotes: [
      "Stop overthinking. You can't control everything, just let it be.",
      "Worrying does not empty tomorrow of its sorrow, it empties today of its strength.",
      "Rule number one is, don't sweat the small stuff. Rule number two is, it's all small stuff.",
      "Breathe. It's just a bad day, not a bad life."
    ],
    songs: [
      { title: 'Let It Go', artist: 'James Bay', lang: 'English' },
      { title: 'Vienna', artist: 'Billy Joel', lang: 'English' },
      { title: 'Love You Zindagi', artist: 'Jasleen Royal', lang: 'Hindi' },
      { title: 'Kinare', artist: 'Mohan Kanan', lang: 'Hindi' },
      { title: 'Samjhana Birsana', artist: 'Nepathya', lang: 'Nepali' },
      { title: 'Jeevan Ko Pana', artist: 'Sajjan Raj Vaidya', lang: 'Nepali' }
    ]
  },
  {
    id: 'unmotivated',
    label: 'Unmotivated',
    color: 'text-gray-400',
    icon: BatteryLow,
    activities: [
      { text: 'Set a timer for 5 minutes and just start' },
      { text: 'Watch an inspirational TED talk' },
      { text: 'Break tasks into tiny steps' },
      { text: 'Review your goals' },
      { text: 'Change your environment' }
    ],
    quotes: [
      "Action is the foundational key to all success.",
      "Don't wait. The time will never be just right.",
      "Your limitation—it's only your imagination.",
      "Don't give up."
    ],
    songs: [
      { title: 'Unstoppable', artist: 'Sia', lang: 'English' },
      { title: 'Hall of Fame', artist: 'The Script', lang: 'English' },
      { title: 'Lakshya', artist: 'Shankar Mahadevan', lang: 'Hindi' },
      { title: 'Chak De India', artist: 'Sukhwinder Singh', lang: 'Hindi' },
      { title: 'Kehi Mitho', artist: 'Narayan Gopal', lang: 'Nepali' },
      { title: 'Pagal', artist: 'Prashant Tamang', lang: 'Nepali' }
    ]
  },
  {
    id: 'confused',
    label: 'Confused',
    color: 'text-teal-400',
    icon: HelpCircle,
    activities: [
      { text: 'Make a pros and cons list' },
      { text: 'Sleep on it' },
      { text: 'Ask for advice' },
      { text: 'Take a break and come back later' },
      { text: 'Trust your gut' }
    ],
    quotes: [
      "Confusion is the sweat of learning.",
      "If you are not confused, you are not paying attention.",
      "Clarity comes from action, not thought.",
      "Trust the process."
    ],
    songs: [
      { title: 'The Scientist', artist: 'Coldplay', lang: 'English' },
      { title: 'Wait', artist: 'NF', lang: 'English' },
      { title: 'Nadaan Parindey', artist: 'Mohit Chauhan', lang: 'Hindi' },
      { title: 'Aao Milo Chalo', artist: 'Shaan', lang: 'Hindi' },
      { title: 'Resham', artist: 'Nepathya', lang: 'Nepali' },
      { title: 'Mayalu', artist: 'Kishore Kumar', lang: 'Nepali' }
    ]
  }
];
