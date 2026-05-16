import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GraduationCap, ChevronDown } from "lucide-react";
import earthTexture from "@/assets/talkspace/earth-texture.jpg";
import tokyoPhoto from "@/assets/talkspace/city-tokyo.jpg";
import barcelonaPhoto from "@/assets/talkspace/city-barcelona.jpg";
import sanfranciscoPhoto from "@/assets/talkspace/city-sanfrancisco.jpg";

// =============================================================================
// Cover letter for Talkspace — Product Design Intern
// Mirrors the standalone "Design AI Compass" project, scoped under
// `.talkspace-page` so its theme (teal/mint + DM Serif Display) does not leak
// into the rest of the portfolio site.
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
  photo: string;
  photoAlt: string;
}

const cities: CityData[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    lat: 28.5,
    lng: 127.0,
    emoji: "🇯🇵",
    countryCode: "jp",
    title: "Product Manager — NTT East Mental Health App",
    description:
      "Led product development for a mental health application at NTT East, one of Japan's largest telecom companies. Gained deep insight into how technology can make mental healthcare more accessible and culturally sensitive.",
    highlights: [
      "Managed end-to-end product lifecycle for a mental wellness platform",
      "Collaborated with cross-functional teams including engineers, designers, and clinical advisors",
      "Developed user-centered features informed by mental health research",
    ],
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
    title: "Experience at Hound — Workflow Automation",
    description:
      "Worked on workflow automation solutions, directly relevant to Talkspace's interest in AI-assisted design and development workflows. Learned how to streamline complex processes through smart tooling.",
    highlights: [
      "Designed and optimized automated workflows for improved efficiency",
      "Bridged the gap between design and engineering teams",
      "Explored AI-powered tools to accelerate product development cycles",
    ],
    photo: barcelonaPhoto,
    photoAlt: "Barcelona cityscape with Sagrada Familia and Mediterranean coast",
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
      "Participated in NASA Space Apps hackathon and took university courses deeply rooted in design thinking methodology — building a strong foundation in human-centered design and rapid prototyping.",
    highlights: [
      "NASA Space Apps Challenge — designed solutions under tight constraints",
      "University courses in design thinking, HCI, and user research",
      "Hands-on experience with Figma, prototyping, and iterative design",
    ],
    photo: sanfranciscoPhoto,
    photoAlt: "San Francisco Golden Gate Bridge at sunset with fog",
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
          Cover Letter: Product Design Intern
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
            Hi, Talkspace Team! 👋
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 text-left"
        >
          <p>
            I'm a graduate student majoring in{" "}
            <span className="text-foreground font-semibold">Computer Science</span> and{" "}
            <span className="text-foreground font-semibold">Cognition & Behavior</span>. When I saw
            this internship, it felt like the perfect intersection of everything I care about —
            designing products that make{" "}
            <span className="text-primary font-semibold">mental healthcare more accessible</span>.
          </p>
          <p>
            I believe I have the relevant experience to bring fresh ideas and genuine passion to
            your team. I've worked across three continents on projects that blend product design,
            mental health, and emerging technology.
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
          className="text-muted-foreground text-center mb-2 max-w-lg mx-auto"
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
                className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 md:p-6 shadow-xl max-w-2xl mx-auto z-10"
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
                <p className="text-muted-foreground mb-3 leading-relaxed text-sm">
                  {activeCityData.description}
                </p>
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
                <div className="mt-4 rounded-xl overflow-hidden border border-border">
                  <img
                    src={activeCityData.photo}
                    alt={activeCityData.photoAlt}
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SummarySection = () => (
  <section className="py-16 px-4 bg-secondary/50">
    <div className="max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif text-foreground text-center mb-8"
      >
        Why I'm a Great Fit
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="space-y-4 text-muted-foreground leading-relaxed text-lg"
      >
        <p>
          My unique blend of{" "}
          <strong className="text-foreground">CS and Cognition & Behavior</strong> gives me both the
          technical skills to work with design systems and code, and the human-centered perspective
          to design for people navigating mental health challenges.
        </p>
        <p>
          From building a{" "}
          <strong className="text-foreground">mental health app at NTT East in Tokyo</strong>, to
          exploring{" "}
          <strong className="text-foreground">workflow automation in Barcelona</strong>, to applying{" "}
          <strong className="text-foreground">
            design thinking at NASA hackathons and university courses in San Francisco
          </strong>{" "}
          — I've consistently worked at the intersection of design, technology, and human
          well-being.
        </p>
        <p>
          I'm excited about preparing your design system for AI-assisted workflows because I've seen
          firsthand how the right structure and naming conventions can transform a team's velocity.
          I'm ready to audit, refine, and experiment with tools like Figma Make and Claude Code to
          help Talkspace lead the way.
        </p>
      </motion.div>
    </div>
  </section>
);

const SKILLS = [
  "Product Design",
  "UX Research",
  "Figma & Figma Make",
  "Design Systems",
  "Prototyping",
  "Interaction Design",
  "Accessibility (WCAG)",
  "User Testing",
  "HTML / CSS / JavaScript",
  "TypeScript & React",
  "Tailwind CSS",
  "Python",
  "Claude Code",
  "AI-Assisted Workflows",
  "Cognitive Psychology",
  "Behavioral Research",
];

const COURSEWORK = [
  "Human-Computer Interaction",
  "Cognitive Psychology",
  "Behavioral Neuroscience",
  "Design Thinking",
  "Data Structures & Algorithms",
  "Machine Learning",
  "Software Engineering",
  "User-Centered Design",
  "Research Methods in Psychology",
  "Mental Health & Technology",
  "Statistics for Behavioral Sciences",
  "Artificial Intelligence",
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

export default function CoverLetterTalkspace() {
  return (
    <div className="talkspace-page min-h-screen">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <span className="font-serif italic text-xl sm:text-2xl text-foreground tracking-wide">
          Sofiia Bilyk
        </span>
      </div>
      <HeroSection />
      <InteractiveMap />
      <SummarySection />
      <SkillsCourseworkSection />
      <FooterSection />
    </div>
  );
}