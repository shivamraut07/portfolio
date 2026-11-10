/* Chapter data for the Silicon Jack portfolio journey */

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  content: string[];
  avatarPosition: 'left' | 'right';
  accentColor: 'electric' | 'cyan';
  avatarImage: string;
  narrationSrc?: string;
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
    avatarImage: '/ref_avatar_sj/SJ00.png',
    narrationSrc: '/audio/ch00-opening.mp3',
  },
  {
    id: 'foundation',
    number: '01',
    title: 'The Foundation',
    subtitle: 'Electronics & Telecommunication Engineering',
    content: [
      "Before writing a single line of C++ or training an AI model, I started at the silicon level. I believe that true innovation requires understanding the raw physical constraints of the hardware.",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    avatarImage: '/ref_avatar_sj/SJ01.png',
    narrationSrc: '/audio/ch01-foundation.mp3',
  },
  {
    id: 'connecting-systems',
    number: '02',
    title: 'Embedded Systems & IoT',
    subtitle: 'Embedded Systems & IoT',
    content: [
      "Bridging physical hardware with digital intelligence. My progression from raw circuit design and custom PCBs to connected IoT microcontrollers handling concurrent sensor logic and API inference.",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    avatarImage: '/ref_avatar_sj/SJ02.png',
    narrationSrc: '/audio/ch02-connecting.mp3',
  },
  {
    id: 'teaching-machines',
    number: '03',
    title: 'Computer Vision & Machine Learning',
    subtitle: 'Computer Vision & Machine Learning',
    content: [
      "Training systems to understand the physical world. My focus lies in curating raw environmental data, annotating custom datasets, and evaluating YOLO vision pipelines for spatial object detection.",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    avatarImage: '/ref_avatar_sj/SJ03.png',
    narrationSrc: '/audio/ch03-vision.mp3',
  },
  {
    id: 'edge-intelligence',
    number: '04',
    title: 'Intelligence at the Edge',
    subtitle: 'Edge AI & TinyML',
    content: [
      "Transitioning from traditional embedded systems to on-device machine learning. My current focus is mastering model quantization, memory constraints, and TinyML deployment workflows on resource-constrained microcontrollers.",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    avatarImage: '/ref_avatar_sj/SJ04.png',
    narrationSrc: '/audio/ch04-edge.mp3',
  },
  {
    id: 'beyond-the-box',
    number: '05',
    title: 'Beyond The Box',
    subtitle: 'Systems Thinking & Research',
    content: [
      "Connecting standalone scripts into autonomous workflows. Utilizing node-based architectures, LLM APIs, and webhooks to build intelligent systems that run themselves.",
    ],
    avatarPosition: 'left',
    accentColor: 'cyan',
    avatarImage: '/ref_avatar_sj/SJ05.png',
    narrationSrc: '/audio/ch05-beyond.mp3',
  },
  {
    id: 'how-i-build',
    number: '06',
    title: 'How I Build',
    subtitle: 'Engineering Workflow',
    content: [
      "Research ? Learn ? Prototype ? Integrate ? Debug ? Test ? Document ? Improve.",
      "Every project follows a deliberate engineering process. AI tools support learning and accelerate exploration, but they don't replace the understanding that comes from building, breaking, and fixing things yourself.",
      "Good engineering is about making informed decisions, understanding trade-offs, and knowing when a solution is genuinely working versus just appearing to work.",
    ],
    avatarPosition: 'right',
    accentColor: 'electric',
    avatarImage: '/ref_avatar_sj/SJ06.png',
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
    avatarImage: '/ref_avatar_sj/SJ07.png',
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
  { id: 'resume', label: 'Resume', href: '/ResumeSRip_v3.pdf' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface ProjectSummary {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  status: 'completed' | 'in-progress' | 'exploration';
  thumbnail?: string;
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
    tagline: '[Project description placeholder � details to be verified]',
    tags: ['Robotics', 'Autonomous Systems'],
    status: 'exploration',
  },
];

export const personalInfo = {
  name: 'Shivam Atul Raut',
  tagline: 'Building at the intersection of Electronics, Embedded Systems and Artificial Intelligence.',
  email: '[email placeholder]',
  github: 'https://github.com/shivamraut07',
  linkedin: 'https://www.linkedin.com/in/shivam-raut-26539b341/',
  resume: '/ResumeSRip_v3.pdf',
};
