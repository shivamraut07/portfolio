/* Chapter data for the Silicon Jack portfolio journey */

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  content: string[];
  avatarPosition: 'left' | 'right';
  accentColor: 'electric' | 'cyan';
  narrationSrc?: string; // placeholder path for audio
}

export const chapters: Chapter[] = [
  {
    id: 'opening',
    number: '00',
    title: "I wasn't trained to fit into one box.",
    subtitle: 'Opening',
    content: [
      "I'm Shivam Raut. Online, I build and create under the name Silicon Jack. I wasn't trained to fit into one box. I learned to connect them.",
      "I started with electronics, explored embedded systems, and gradually moved toward intelligent systems that connect the physical and digital worlds.",
      "Building at the intersection of Electronics, Embedded Systems and Artificial Intelligence.",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    narrationSrc: '/audio/ch00-opening.mp3',
  },
  {
    id: 'foundation',
    number: '01',
    title: 'The Foundation',
    subtitle: 'Electronics & Telecommunication Engineering',
    content: [
      "Electronics and Telecommunication Engineering — the foundation that started everything. Circuit design, signal processing, embedded programming, and understanding how hardware communicates.",
      "This is where I learned to think in systems: how components connect, how signals flow, and how constraints drive engineering decisions.",
      "[Education details, coursework highlights, and foundational projects to be added]",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    narrationSrc: '/audio/ch01-foundation.mp3',
  },
  {
    id: 'connecting-systems',
    number: '02',
    title: 'Connecting Systems',
    subtitle: 'Embedded Systems & IoT',
    content: [
      "From standalone circuits to connected devices. ESP32 microcontrollers, sensor integration, MQTT protocols, and building systems that bridge hardware and software.",
      "Projects like the AI Smart Home system and illegal vehicle detection brought together embedded programming with real-world problem solving.",
      "[Project photos, architecture diagrams, and implementation details to be added]",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    narrationSrc: '/audio/ch02-connecting.mp3',
  },
  {
    id: 'teaching-machines',
    number: '03',
    title: 'Teaching Machines to Understand',
    subtitle: 'Computer Vision & AI',
    content: [
      "Computer vision transforms raw pixels into actionable understanding. Object detection with YOLOv11, multi-object tracking with ByteTrack, and event detection in real-world scenarios.",
      "CivicEye — a traffic monitoring system that detects and tracks vehicles, identifies violations, and provides verified analytics. Engineering contribution focused on detection accuracy and tracking reliability.",
      "[Verified metrics, system architecture, and demo screenshots to be added]",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    narrationSrc: '/audio/ch03-vision.mp3',
  },
  {
    id: 'edge-intelligence',
    number: '04',
    title: 'Intelligence at the Edge',
    subtitle: 'Edge AI & TinyML',
    content: [
      "Running AI models on microcontrollers and edge devices. Model optimisation, quantisation experiments, and exploring deployment on resource-constrained hardware.",
      "Edge Impulse workflows, TensorFlow Lite conversions, and understanding the trade-offs between model accuracy and inference speed on embedded platforms.",
      "[Deployment experiments, optimisation results, and current status to be added. Ongoing work clearly distinguished from completed deployment.]",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    narrationSrc: '/audio/ch04-edge.mp3',
  },
  {
    id: 'beyond-screen',
    number: '05',
    title: 'Beyond the Screen',
    subtitle: 'Autonomous Systems & Robotics',
    content: [
      "Exploring autonomous systems, drone technology, and robotics. Interests that extend engineering from the digital world into physical autonomous platforms.",
      "Relevant experience with e-Yantra robotics competition, NIDAR project work, and exploring the fundamentals of autonomous navigation.",
      "[Genuine project work and verified experience to be added. No unverified achievements or affiliations.]",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    narrationSrc: '/audio/ch05-beyond.mp3',
  },
  {
    id: 'how-i-build',
    number: '06',
    title: 'How I Build',
    subtitle: 'Engineering Workflow',
    content: [
      "Research → Learn → Prototype → Integrate → Debug → Test → Document → Improve.",
      "Every project follows a deliberate engineering process. AI tools support learning and accelerate exploration, but they don't replace the understanding that comes from building, breaking, and fixing things yourself.",
      "Good engineering is about making informed decisions, understanding trade-offs, and knowing when a solution is genuinely working versus just appearing to work.",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    narrationSrc: '/audio/ch06-workflow.mp3',
  },
  {
    id: 'closing',
    number: '07',
    title: "I'm still building.",
    subtitle: 'What Comes Next',
    content: [
      "The journey continues. New projects, deeper understanding, and more connections between electronics, embedded systems, and artificial intelligence.",
      "Every system I build teaches me something new about how the physical and digital worlds intersect.",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    narrationSrc: '/audio/ch07-closing.mp3',
  },
];

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface ProjectSummary {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  status: 'completed' | 'in-progress' | 'exploration';
  thumbnail?: string; // placeholder
}

export const projects: ProjectSummary[] = [
  {
    id: 'civiceye',
    title: 'CivicEye',
    tagline: 'Intelligent traffic monitoring with YOLOv11 and ByteTrack',
    tags: ['Computer Vision', 'YOLOv11', 'ByteTrack', 'Python'],
    status: 'completed',
  },
  {
    id: 'ai-smart-home',
    title: 'AI Smart Home',
    tagline: 'IoT-based home automation with ESP32 and sensor integration',
    tags: ['IoT', 'ESP32', 'MQTT', 'Embedded C'],
    status: 'completed',
  },
  {
    id: 'illegal-vehicle-detection',
    title: 'Illegal Vehicle Detection',
    tagline: 'Automated detection system for traffic rule violations',
    tags: ['Computer Vision', 'Deep Learning', 'Python'],
    status: 'completed',
  },
  {
    id: 'edge-ai-experiments',
    title: 'Edge AI Experiments',
    tagline: 'TinyML model optimisation and edge deployment exploration',
    tags: ['TinyML', 'Edge Impulse', 'TFLite', 'Embedded'],
    status: 'in-progress',
  },
  {
    id: 'nidar',
    title: 'NIDAR',
    tagline: '[Project description placeholder — details to be verified]',
    tags: ['Robotics', 'Autonomous Systems'],
    status: 'exploration',
  },
];

export const personalInfo = {
  name: 'Shivam Atul Raut',
  tagline: 'Building at the intersection of Electronics, Embedded Systems and Artificial Intelligence.',
  email: '[email placeholder]',
  github: '[GitHub URL placeholder]',
  linkedin: '[LinkedIn URL placeholder]',
  resume: '[Resume URL placeholder]',
};
