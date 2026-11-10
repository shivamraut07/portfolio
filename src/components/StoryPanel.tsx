import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, Terminal } from 'lucide-react';
import type { Chapter } from '@/data/chapters';
import type { ProjectModalData } from './ProjectModal';

const hardwareProjects: Record<string, ProjectModalData> = {
  fpga: { title: '10M02 MAX10 FPGA Development Board', tech: ['KiCad', 'PSpice', 'PCB Design', 'Power Simulation'], situation: 'Tasked with designing a complete multi-layer FPGA development board for a Zoho hardware assessment, which required strict power supply validation and precise signal routing constraints.', action: 'Architected the complete schematic and PCB layout from scratch in KiCad. Ran rigorous PSpice simulations to validate the power delivery network and ensure stable voltage levels before routing the final copper traces.', result: 'Successfully delivered a production-ready, multi-layer hardware layout, demonstrating professional proficiency in EDA tools, PCB design principles, and electrical simulation.' },
  smartHome: { title: 'AI Smart Home Automation', tech: ['ESP32-CAM', 'Embedded C', 'MediaPipe', 'MQTT', 'MQ135/DHT11'], situation: 'Needed a unified embedded system capable of handling concurrent security (facial recognition) and environmental monitoring without freezing or crashing the microcontroller.', action: 'Developed custom embedded C control logic on an ESP32 to concurrently process environmental sensor inputs (MQ135/DHT11), handle MQTT network protocols, and actuate a servo mechanism based on MediaPipe cosine similarity outputs.', result: 'Achieved a responsive 70-75% accuracy rate for biometric access control with a fast 0.5-0.7 second response time, successfully proving the ability to manage complex hardware concurrency.' },
  illegalParking: { title: 'Illegal Vehicle Detection System', tech: ['ESP32-CAM', 'PIR Sensor', 'Hugging Face API', 'ISD1820 Audio'], situation: 'Tasked by a professor to stop illegal parking at our department. Basic motion sensors couldn\'t differentiate between vehicles, humans, or animals, requiring a vision-based object detection approach.', action: 'Initially explored on-device TinyML (Edge Impulse). When hardware limits bottlenecked performance, I pivoted to engineer an ESP32-CAM pipeline that queries a Hugging Face API to specifically classify vehicles before triggering audio.', result: 'Successfully solved the department\'s parking issue. The hybrid IoT-cloud system accurately ignored pedestrians and triggered automated voice alerts only for vehicles, achieving a fast 0.5-1.0 sec inference latency.' },
  foundations: { title: 'Bare-Metal Hardware Foundations', tech: ['Logic Gates', '555 Timers', 'Discrete Components', 'Circuit Design'], situation: 'Most beginners jump straight into Arduino or ESP32 without understanding the underlying electronics, leaving critical gaps in hardware fundamentals and debugging skills.', action: 'I deliberately started my journey at the component level—mastering logic gates, 555 timers, and discrete circuit design to understand raw electrical behavior before ever touching a microcontroller or writing a line of code.', result: 'Built a robust, bare-metal hardware intuition that now allows me to debug complex PCB routing, optimize power delivery, and troubleshoot IoT hardware constraints that software-only developers struggle with.' },
  portfolioMeta: { title: 'The Silicon Jack Architecture (Meta-Project)', tech: ['Advanced Prompt Engineering', 'React/Tailwind', 'Canva', 'Media Optimization'], situation: 'I needed a way to consolidate a year of disjointed hardware, ML, and embedded projects into a single, cohesive cinematic experience without spending months writing boilerplate web code.', action: 'I treated the portfolio as a systems engineering problem. I orchestrated AI coding agents via advanced prompt engineering to rapidly build the React architecture. To optimize performance, I utilized Canva and video editing to pre-render complex diagrams and animations, offloading heavy DOM rendering into lightweight media assets.', result: 'Delivered a production-ready, dual-pane interactive portfolio. This website serves as a live, interactive proof-of-concept of my systems thinking, UI/UX optimization, and AI orchestration capabilities.' },
  vihangRadar: { title: 'Vihang Radar (Experimental Automation)', tech: ['n8n', 'Gemini API', 'Serper.dev', 'Google Sheets'], situation: 'Explored an automated approach to track and filter tech fests and drone competitions. While the organization ultimately preferred manual delegation for accountability, I built this to test zero-touch workflow automation.', action: 'Architected an experimental n8n workflow. It triggers HTTP requests to Serper.dev for web scraping, pipes raw results into the Gemini API for natural language extraction, and writes structured data into Google Sheets.', result: 'Successfully proved the concept of an autonomous intelligence radar. The experiment served as a powerful sandbox for mastering API orchestration, node-based automation, and LLM data extraction.' },
};

interface StoryPanelProps {
  chapter: Chapter;
  reducedMotion: boolean;
  onSelectProject?: (project: ProjectModalData) => void;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function StoryPanel({
  chapter,
  reducedMotion,
  onSelectProject,
  onNextChapter,
  onPrevChapter,
  isFirst = false,
  isLast = false,
}: StoryPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.id}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        id={Number(chapter.number) >= 1 && Number(chapter.number) <= 6 ? `chapter-${Number(chapter.number)}` : undefined}
        className="mb-32 flex w-full flex-col justify-center px-2 py-8 sm:px-4 lg:px-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded border border-[#111111]/10 bg-[#111111]/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#444444] dark:border-white/10 dark:bg-white/5 dark:text-gray-500">
            <Terminal className="h-3 w-3 text-[#444444] dark:text-gray-400" />
            Chapter {chapter.number}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#444444] dark:text-gray-400">
            {chapter.subtitle}
          </span>
        </div>

        <h2 className="mb-7 max-w-lg font-serif text-3xl font-medium tracking-tight text-[#111111] dark:text-white sm:text-4xl lg:text-[3.2rem] lg:leading-[1.04]">
          {chapter.title}
        </h2>

        <div className="mb-8 space-y-4 border-l border-[#111111]/10 pl-4 sm:pl-5 dark:border-white/10">
          {chapter.content.map((paragraph, index) => {
            const isPlaceholder = paragraph.startsWith('[');
            return (
              <div key={index}>
                <motion.p
                initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.1 + index * 0.08,
                  duration: 0.35,
                }}
                className={`text-[15px] leading-relaxed ${
                  isPlaceholder
                    ? 'rounded border border-dashed border-[#111111]/10 bg-[#111111]/[0.02] p-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#444444] dark:border-white/10 dark:bg-white/[0.02] dark:text-gray-500'
                    : 'text-[#333333] dark:text-gray-300'
                }`}
              >
                {paragraph}
              </motion.p>
              {chapter.id === 'connecting-systems' && index === 0 && (
                <div className="mt-8 grid gap-6 lg:grid-cols-1">
                  {[
                    {
                      src: '/video/EM_FPGA.mp4',
                      title: '10M02 MAX10 FPGA Development Board',
                      tag: 'KiCad',
                      description: 'Designed a complete multi-layer schematic and PCB layout with PSpice validated power supply simulations.',
                    },
                    {
                      src: '/video/EM_SH.mp4',
                      title: 'AI Smart Home Automation',
                      tag: 'ESP32-CAM',
                      description: 'Unified face-recognition access (MediaPipe), concurrent environmental monitoring (MQ135/DHT11), and MQTT-triggered servo actuation.',
                    },
                    {
                      src: '/video/IOT_PARK.mp4',
                      title: 'Illegal Vehicle Detection System',
                      tag: 'IoT + API',
                      description: 'PIR-triggered capture pipeline utilizing cloud inference (1.5-2.0 sec latency) and automated audio alerts via ISD1820 module.',
                    },
                  ].map((project) => (
                    <div
                      key={project.title}
                      className="mt-8 cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50" onClick={() => onSelectProject?.(project.title === '10M02 MAX10 FPGA Development Board' ? hardwareProjects.fpga : project.title === 'AI Smart Home Automation' ? hardwareProjects.smartHome : hardwareProjects.illegalParking)}
                    >
                      <div className="relative aspect-video w-full bg-black">
                        <video
                          src={project.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover opacity-90"
                        />
                        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                          <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            {project.tag}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {chapter.id === 'teaching-machines' && index === 0 && (
                <div className="mt-8 flex flex-col gap-8">
                  {[
                    {
                      media: 'video',
                      src: '/video/annot_cv.mp4',
                      title: 'Custom Environmental Dataset',
                      tag: 'Roboflow / YOLO',
                      description: 'Curated and manually annotated a 1,700+ image dataset from scratch to train custom detection models for identifying specific environmental objects in isolated frames.',
                    },
                    {
                      media: 'video',
                      src: '/video/graph_cv.mp4',
                      title: 'Model Evaluation & Training Metrics',
                      tag: 'Training Analysis',
                      description: 'Analyzing loss convergence and mean Average Precision (mAP) over multiple epochs to validate model stability and feature extraction accuracy.',
                    },
                  ].map((project) => (
                    <div
                      key={project.title}
                      className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50"
                    >
                      <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                        {project.media === 'video' ? (
                          <video
                            src={project.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover opacity-90"
                          />
                        ) : (
                          <img src={project.src} alt={project.title} className="absolute inset-0 h-full w-full object-cover opacity-90" />
                        )}
                        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                          <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            {project.tag}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {chapter.id === 'edge-intelligence' && index === 0 && (
                <div className="mt-8 flex flex-col gap-8">
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50">
                    <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                      <img src="/video/edge_ml.png" alt="Coursera Edge AI Certificate" className="absolute inset-0 h-full w-full object-cover opacity-90" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Introduction to Embedded Machine Learning</h3>
                        <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">Coursera / Edge Impulse</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Completed foundational training on deploying machine learning models to microcontrollers, focusing on anomaly detection, sensor data pipelines, and TinyML workflows.</p>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50">
                    <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                      <img src="/video/edge_model.jpg" alt="TinyML hardware deployment result" className="absolute inset-0 h-full w-full object-cover opacity-90" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">TinyML Vehicle Detection Experiment</h3>
                        <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">ESP32-CAM / TFLite</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Applying Edge AI concepts to physical hardware. Deployed an experimental on-device vehicle detection model to an ESP32-CAM to document memory constraints and inference trade-offs.</p>
                    </div>
                  </div>
                </div>
              )}
              {chapter.id === 'foundation' && index === 0 && (
                <>
                  <div className="cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50" onClick={() => onSelectProject?.(hardwareProjects.foundations)}>
                    <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                      <video src="/video/foundations.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bare-Metal Electronics</h3>
                        <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">Read Case Study →</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Mastering 555 timers, logic gates, and discrete components to build a foundation in raw hardware before transitioning to microcontrollers.</p>
                    </div>
                  </div>
                  </>
              )}
              </div>
            );
          })}

        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {isFirst ? (
            <button
              onClick={onNextChapter}
              className="inline-flex items-center gap-2 rounded border border-[#111111]/10 bg-[#111111]/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Start Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <>
              {!isFirst && (
                <button
                  onClick={onPrevChapter}
                  className="inline-flex items-center gap-2 rounded border border-[#111111]/10 bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#111111]/5 hover:text-[#111111] dark:border-white/10 dark:bg-[#111111] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                  aria-label="Previous chapter"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
              )}
              {!isLast && (
                <button
                  onClick={onNextChapter}
                  className="inline-flex items-center gap-2 rounded border border-[#111111]/10 bg-[#111111]/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  aria-label="Next chapter"
                >
                  Next Chapter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </>
          )}

          {isLast && (
            <div className="mt-2 flex w-full flex-wrap gap-2">
              {[
                { label: 'View Projects', href: '#projects', primary: true },
                { label: 'GitHub', href: 'https://github.com/shivamraut07', external: true },
                { label: 'Resume', href: '/ResumeSRip_v3.pdf', external: true },
                { label: 'Get in Touch', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className={`inline-flex items-center gap-1.5 rounded border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    link.primary
                      ? 'border-[#111111]/10 bg-[#111111]/5 text-[#111111] hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                      : 'border-[#111111]/10 bg-white text-[#111111] hover:bg-[#111111]/5 dark:border-white/10 dark:bg-[#111111] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.external && <ExternalLink className="h-3 w-3 text-[#444444] dark:text-gray-500" />}
                </a>
              ))}
            </div>
          )}
        </div>

        {chapter.id === 'beyond-the-box' && (
          <div className="mb-32 mt-16 border-t border-black/10 pt-16 dark:border-white/10">
            <div className="mb-8 flex flex-col items-center text-center">
              <span className="mb-4 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Chapter 05</span>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white">Systems &amp; Automation</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">Connecting standalone scripts into autonomous workflows. Utilizing node-based architectures, LLM APIs, and webhooks to build intelligent systems that run themselves.</p>
            </div>
            <div className="flex flex-col gap-8">
              <div
                onClick={() => onSelectProject?.(hardwareProjects.vihangRadar)}
                className="cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/50"
              >
                <div className="relative flex aspect-video w-full items-center justify-center bg-black">
                  <video src="/video/n8n.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Vihang Radar (Experiment)</h3>
                    <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">Read Case Study →</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Automated event intelligence workflow connecting Serper.dev web search, Gemini API data extraction, and Google Sheets via n8n HTTP Request nodes.</p>
                </div>
              </div>

              <div className="mt-8 border-t border-black/10 pt-8 dark:border-white/10">
            <div className="mb-8 flex flex-col items-center text-center">
            <span className="mb-4 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Live Deployment</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">This Portfolio is a Project.</h2>
            <p className="mt-4 max-w-lg text-sm text-gray-600 dark:text-gray-400">A masterclass in modern AI-assisted engineering, systems thinking, and asset optimization.</p>
          </div>

          <div
            onClick={() => onSelectProject?.(hardwareProjects.portfolioMeta)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 backdrop-blur-sm transition-all hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] dark:from-slate-900/80 dark:to-black"
          >
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-black">
              <img src="/video/pf_page.png" alt="Portfolio Architecture" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
            </div>
            <div className="border-t border-black/5 p-6 dark:border-white/5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Orchestration &amp; Systems Thinking</h3>
                <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-mono text-cyan-600 dark:text-cyan-400">Read Case Study →</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">How I used advanced prompt engineering, Canva, and media rendering to build this cinematic web experience.</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
