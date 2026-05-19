import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GraduationCap, ChevronDown } from "lucide-react";
import earthTexture from "@/assets/talkspace/earth-texture.jpg";
import tokyoPhoto from "@/assets/talkspace/tokyo-team.png";

// =============================================================================
// Cover letter for Shared Context Lab
// =============================================================================

interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji: string;
  countryCode: string;
  title: string;
  description: string;
  highlights: string[];
  photo?: string;
  photoAlt?: string;
}

const cities: CityData[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    lat: 28.5,
    lng: 127.0,
    emoji: "🇯🇵",
    countryCode: "jp",
    title: "Technical Product Manager — NTT East Workplace Wellness App",
    description:
      "During my study abroad in Tokyo, I worked at NTT East Japan as a Technical Product Manager for a seven-person team, where we shipped a full-stack workplace wellness application end-to-end. Shiawase (幸せ, “happiness”) is designed to help prevent burnout in Japanese corporate culture. I led the product from idea to launch, also being a part of the developers team. \n\nFollowing the Lean methodology, we started with customer discovery through VoC research and user interviews, which revealed a core challenge. Beyond building a sophisticated system, we encountered a cultural obstacle: a deep social stigma around the topic of mental health in Japan. I translated those findings into prioritized product requirements that led to specifications for a React 19 + Vite frontend backed by Supabase and Postgres triggers. After shipping the first MVP, we conducted feedback sessions with executives from major Japanese companies and NTT’s Wellness Lounge Team, which gave us a different perspective and drove further iteration before launch.\n\nThe creation process was both challenging and fascinating because this is not a personal-use app. It is a corporate application with multiple stakeholders and needs to feel engaging and reliable for employees while also providing meaningful insights to team managers on how to improve overall team efficiency. Our product already serves as an internal corporate resource for over 300,000 users.\n\nYou can check out one of the early prototypes here: https://github.com/Sofiia-Bilyk/Mental-Health-App",
    highlights: [],
    photo: tokyoPhoto,
    photoAlt: "Tokyo cityscape at dusk with Tokyo Tower and Mt Fuji",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    lat: 32.0,
    lng: -8.0,
    emoji: "🇪🇸",
    countryCode: "es",
    title: "Junior RPA/Data Engineer — Hound Line",
    description:
      "I spent two years as a Junior RPA/Data Engineer at Hound Line in Barcelona, where I worked with private and government organizations to automate the parts of their workflows that consumed the most time. After mapping the client’s existing workflows and shaping a plan based on expected KPI gains vs time constraints, I built the systems using Python, UiPath, and SQL, with Qlik dashboards for visibility, achieving a ~85–90% process outcome success rate.\n\nMany clients operated in highly regulated industries, including healthcare, legal services, and banking, so rather than replacing entire workflows in one shot, we implemented automation in layers, maintaining strict security protocols along the way. For example, we started with repetitive tasks and then expanded into more complex, time-sensitive, multi-layered processes, which allowed clients to continue operations without interruption and gave us the flexibility to incorporate feedback before moving to the next stage.",
    highlights: [],
  },
  {
    id: "sanfrancisco",
    name: "San Francisco",
    lat: 30.5,
    lng: -127.0,
    emoji: "🇺🇸",
    countryCode: "us",
    title: "NASA Space Apps & University Design Thinking",
    description:
      "During my studies at Minerva University, based in San Francisco, I also joined different projects in parallel, including the development of conversational AI agents at EVE.Calls, where I worked on an automated client outreach system for one of the top five Ukrainian state-owned banks. I worked directly with the bank’s team to translate their communication workflows, compliance requirements, and internal scripts into conversational logic for AI phone agents.\n\nWe orchestrated responses by combining outputs from OpenAI, Groq, and Mistral models, ensembling their probability distributions across answer categories to surface the most reliable response. Also, I monitored production call statistics, identified failure patterns, and iterated on problematic parts of the system, helping it achieve over 95% successful conversations.\n\nCheck the article about this project here: https://evecalls.com/cases/reliable-debt-collection-at-scale-bank-automated-outreach-system\nA mini-prototype of the conversational agent: https://github.com/Sofiia-Bilyk/LLM-Agent\n",
    highlights: [],
  },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function CityPin({
  city,
  isActive,
  onClick,
}: {
  city: CityData;
  isActive: boolean;
  onClick: () => void;
}) {
  const pos = useMemo(() => latLngToVector3(city.lat, city.lng, 1.02), [city]);
  const outerPos = useMemo(() => latLngToVector3(city.lat, city.lng, 1.08), [city]);
  const ref = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const s = 1 + 0.3 * Math.sin(clock.getElapsedTime() * 2);
      pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh position={pos.clone().lerp(outerPos, 0.5)}>
        <cylinderGeometry args={[0.005, 0.005, pos.distanceTo(outerPos), 4]} />
        <meshBasicMaterial color={isActive ? "#ff4444" : "#cc0000"} />
      </mesh>
      <mesh ref={ref} position={outerPos} onClick={onClick}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={isActive ? "#ff4444" : "#cc0000"} />
      </mesh>
      <mesh ref={pulseRef} position={outerPos}>
        <ringGeometry args={[0.055, 0.07, 32]} />
        <meshBasicMaterial color="#ff6666" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Globe({
  activeCity,
  onCityClick,
}: {
  activeCity: string | null;
  onCityClick: (id: string) => void;
}) {
  const texture = useMemo(() => new THREE.TextureLoader().load(earthTexture), []);

  return (
    <group>
      <Sphere args={[1.05, 64, 64]}>
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0.05} />
      </Sphere>
      {cities.map((city) => (
        <CityPin
          key={city.id}
          city={city}
          isActive={activeCity === city.id}
          onClick={() => onCityClick(city.id)}
        />
      ))}
    </group>
  );
}

const HeroSection = () => (
  <>
    <section className="px-4 pt-16 pb-6 md:pt-20 md:pb-8 text-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-primary font-semibold tracking-wide uppercase text-sm">
          Cover Letter: Product Intern
        </p>
      </motion.div>
    </section>
    <section className="flex items-center justify-center px-4 pt-8 pb-10 md:pt-10 md:pb-12 bg-secondary/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-6 leading-tight whitespace-nowrap">
            Hi, Arena Team! 👋
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 text-left"
        >
          <p>
            I'm Sofiia, and I'm passionate about building products that people
            actually want and use. I major in{" "}
            <span className="text-foreground font-semibold">Computer and Social Sciences</span> ({" "}
            <span className="text-foreground font-semibold">Cognition & Behavior</span>), which gives
            me a perfect combination of{" "}
            <span className="text-primary font-semibold">technical knowledge</span> and insights into{" "}
            <span className="text-primary font-semibold">human behavior and decision-making</span>.
          </p>
          <p>
            Let me walk you through some of my experiences so we can see if we're a good fit!
          </p>
        </motion.div>
      </div>
    </section>
  </>
);

const InteractiveMap = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const activeCityData = cities.find((c) => c.id === activeCity);

  const handleCityClick = (id: string) => {
    setActiveCity(activeCity === id ? null : id);
  };

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-foreground text-center mb-3"
        >
          Relevant Global Experiences
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-2 mx-auto whitespace-nowrap"
        >
          Rotate the globe and choose a pin to learn more about my experience.
        </motion.p>

        <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible px-1">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.id)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap flex-shrink-0 ${
                activeCity === city.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <img
                  src={`https://flagcdn.com/w40/${city.countryCode}.png`}
                  srcSet={`https://flagcdn.com/w80/${city.countryCode}.png 2x`}
                  alt={`${city.name} flag`}
                  width={20}
                  height={15}
                  className="rounded-sm shadow-sm"
                  loading="lazy"
                />
                {city.name}
              </span>
            </button>
          ))}
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-border bg-card"
          style={{ height: "500px" }}
        >
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            style={{ background: "radial-gradient(ellipse at center, #0a1838 0%, #02040d 80%)" }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 3, 5]} intensity={1} />
            <directionalLight position={[-5, -3, -5]} intensity={0.3} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Globe activeCity={activeCity} onCityClick={handleCityClick} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={1.8}
              maxDistance={4}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>

          <AnimatePresence>
            {activeCityData && (
              <motion.div
                key={activeCityData.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute inset-y-4 left-4 right-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 md:p-6 shadow-xl max-w-2xl mx-auto z-10 overflow-y-auto"
              >
                <button
                  onClick={() => setActiveCity(null)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`https://flagcdn.com/w80/${activeCityData.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${activeCityData.countryCode}.png 2x`}
                    alt={`${activeCityData.name} flag`}
                    width={32}
                    height={24}
                    className="rounded-sm shadow-sm flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-lg font-serif text-foreground">{activeCityData.name}</h3>
                    <p className="text-xs font-semibold text-primary">{activeCityData.title}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-3">
                  {activeCityData.description.split("\n\n").map((paragraph, i) => {
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    const parts = paragraph.split(urlRegex);
                    const isUrl = (s: string) => /^https?:\/\//.test(s);
                    return (
                      <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                        {parts.map((part, j) =>
                          isUrl(part) ? (
                            <a
                              key={j}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline hover:opacity-80 break-all"
                            >
                              {part}
                            </a>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
                {activeCityData.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {activeCityData.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-xs text-foreground"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                )}
                {activeCityData.photo && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-border">
                    <img
                      src={activeCityData.photo}
                      alt={activeCityData.photoAlt}
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SKILLS = [
  "Python",
  "SQL",
  "React",
  "Flask",
  "HTML",
  "CSS",
  "JavaScript",
  "VoC Research",
  "SWE Development",
  "ORM",
  "Supabase",
  "TypeScript",
  "Collaboration",
  "Agile / Lean Methodology",
  "Automation/Optimization",
  "UX Design",
  "Adaptability",
  "AI Agents",
  "HCI",
  "API",
];

const COURSEWORK = [
  "Problem Solving with Data Structures and Algorithms",
  "Formal Analyses",
  "Complex Systems",
  "Harnessing Artificial Intelligence Algorithms",
  "Software Development: Building Powerful Applications",
  "Psychology: From Neurons to Society",
];

const SkillsCourseworkSection = () => {
  const [open, setOpen] = useState<"skills" | "coursework" | null>(null);

  const toggle = (panel: "skills" | "coursework") =>
    setOpen((prev) => (prev === panel ? null : panel));

  const items = open === "skills" ? SKILLS : open === "coursework" ? COURSEWORK : [];

  return (
    <section className="px-4 pb-16 -mt-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => toggle("skills")}
            aria-expanded={open === "skills"}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm sm:text-base transition-all ${
              open === "skills"
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card text-foreground border-border hover:bg-secondary"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Relevant Skills</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open === "skills" ? "rotate-180" : ""}`}
            />
          </button>
          <button
            onClick={() => toggle("coursework")}
            aria-expanded={open === "coursework"}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm sm:text-base transition-all ${
              open === "coursework"
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card text-foreground border-border hover:bg-secondary"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Relevant Coursework</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open === "coursework" ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-5 sm:p-6 rounded-xl bg-card border border-border shadow-sm">
                <h3 className="text-lg font-serif text-foreground mb-3">
                  {open === "skills" ? "Relevant Skills" : "Relevant Coursework"}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-secondary text-foreground text-xs sm:text-sm border border-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const FooterSection = () => (
  <section className="py-10 sm:py-14 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto"
    >
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 whitespace-nowrap">
        Thank you for reading!
      </h2>
      <p className="text-foreground mb-4 text-sm sm:text-lg font-medium whitespace-nowrap">
        There's so much more I'd love to share with you ✨
      </p>
      <p className="text-muted-foreground mb-8 text-lg">
        If you'd like to learn more about me and my work, feel free to explore:
      </p>
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <a
          href="https://www.linkedin.com/in/sofia-bilyk/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-secondary transition-colors shadow-sm whitespace-nowrap"
        >
          💼 LinkedIn
        </a>
      </div>
    </motion.div>
  </section>
);

export default function CoverLetterArena() {
  return (
    <div className="talkspace-page min-h-screen">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <span className="font-serif italic text-xl sm:text-2xl text-foreground tracking-wide">
          Sofiia Bilyk
        </span>
      </div>
      <HeroSection />
      <InteractiveMap />
      <SkillsCourseworkSection />
      <FooterSection />
    </div>
  );
}
