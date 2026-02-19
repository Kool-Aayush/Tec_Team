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
  Github,
  Twitter,
  Linkedin,
  Mail,
  Target,
  Eye
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
    github?: string;
    twitter?: string;
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
    name: "Alex Chen",
    role: "Frontend Developer",
    description: "Specializing in React and framer-motion animations.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    socials: { github: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "Sarah Miller",
    role: "UI/UX Designer",
    description: "Creating intuitive and beautiful emotional wellness interfaces.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    socials: { github: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "Raj Patel",
    role: "JavaScript Developer",
    description: "Expert in complex logic and dynamic data rendering.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    socials: { github: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "Elena Vogt",
    role: "Project Manager",
    description: "Leading the team towards better mental health solutions.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    socials: { github: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "Maya Sharma",
    role: "Content & Research",
    description: "Curating soulful content and meaningful activities for every mood.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    socials: { github: "#", twitter: "#", linkedin: "#" }
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
      { title: 'Fix You', artist: 'Coldplay', lang: 'English' },
      { title: 'Someone Like You', artist: 'Adele', lang: 'English' },
      { title: 'Let Her Go', artist: 'Passenger', lang: 'English' },
      { title: 'Channa Mereya', artist: 'Ae Dil Hai Mushkil', lang: 'Hindi' },
      { title: 'Agar Tum Saath Ho', artist: 'Tamasha', lang: 'Hindi' },
      { title: 'Tadap Tadap', artist: 'Hum Dil De Chuke Sanam', lang: 'Hindi' },
      { title: 'Timro Yaad', artist: 'The Edge Band', lang: 'Nepali' },
      { title: 'Maya', artist: 'Asif Shah', lang: 'Nepali' }
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
      { title: 'Stronger', artist: 'Kanye West', lang: 'English' },
      { title: 'Believer', artist: 'Imagine Dragons', lang: 'English' },
      { title: 'In The End', artist: 'Linkin Park', lang: 'English' },
      { title: 'Zinda', artist: 'Bhaag Milkha Bhaag', lang: 'Hindi' },
      { title: 'Kar Har Maidaan Fateh', artist: 'Sanju', lang: 'Hindi' },
      { title: 'Apna Time Aayega', artist: 'Gully Boy', lang: 'Hindi' },
      { title: 'Hamro Nepal Ma', artist: 'Neetesh Jung Kunwar', lang: 'Nepali' },
      { title: 'Aago', artist: 'Cobweb', lang: 'Nepali' }
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
      { title: 'Happy', artist: 'Pharrell Williams', lang: 'English' },
      { title: 'Can’t Stop the Feeling!', artist: 'Justin Timberlake', lang: 'English' },
      { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', lang: 'English' },
      { title: 'Ilahi', artist: 'Yeh Jawaani Hai Deewani', lang: 'Hindi' },
      { title: 'Gallan Goodiyan', artist: 'Dil Dhadakne Do', lang: 'Hindi' },
      { title: 'Sooraj Dooba Hain', artist: 'Roy', lang: 'Hindi' },
      { title: 'Kutu Ma Kutu', artist: 'Dui Rupaiyan', lang: 'Nepali' },
      { title: 'Paan Ko Paat', artist: 'Traditional/Remix', lang: 'Nepali' }
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
      { title: 'Astronaut in the Ocean', artist: 'Masked Wolf', lang: 'English' },
      { title: 'Lonely', artist: 'Akon', lang: 'English' },
      { title: 'Kabira', artist: 'Yeh Jawaani Hai Deewani', lang: 'Hindi' },
      { title: 'Luka Chuppi', artist: 'Rang De Basanti', lang: 'Hindi' },
      { title: 'Syndicate', artist: 'Bipul Chettri', lang: 'Nepali' }
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
      { title: 'Imagine', artist: 'John Lennon', lang: 'English' },
      { title: 'Kun Faya Kun', artist: 'Rockstar', lang: 'Hindi' },
      { title: 'Iktara', artist: 'Wake Up Sid', lang: 'Hindi' },
      { title: 'Resham Firiri', artist: 'Instrumental', lang: 'Nepali' }
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
      { title: 'Let It Be', artist: 'The Beatles', lang: 'English' },
      { title: 'Unwritten', artist: 'Natasha Bedingfield', lang: 'English' },
      { title: 'Love You Zindagi', artist: 'Dear Zindagi', lang: 'Hindi' },
      { title: 'Kinare', artist: 'Queen', lang: 'Hindi' },
      { title: 'Samjhana Birsana', artist: 'Nepathya', lang: 'Nepali' }
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
      "Just do it."
    ],
    songs: [
      { title: 'Eye of the Tiger', artist: 'Survivor', lang: 'English' },
      { title: 'Lose Yourself', artist: 'Eminem', lang: 'English' },
      { title: 'Lakshya', artist: 'Lakshya', lang: 'Hindi' },
      { title: 'Chak De India', artist: 'Chak De India', lang: 'Hindi' },
      { title: 'Kehi Mitho', artist: 'Narayan Gopal', lang: 'Nepali' }
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
      { title: 'Should I Stay or Should I Go', artist: 'The Clash', lang: 'English' },
      { title: 'Nadaan Parindey', artist: 'Rockstar', lang: 'Hindi' },
      { title: 'Aao Milo Chalo', artist: 'Jab We Met', lang: 'Hindi' },
      { title: 'Bistarai Bistarai', artist: 'Rohit John Chettri', lang: 'Nepali' }
    ]
  }
];
