import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/placeholder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import workPhoto from "@/assets/work-photo.jpg";
import nttTeam1 from "@/assets/ntt-team-1.png";
import nttTeam2 from "@/assets/ntt-team-2.png";
import nttDemo from "@/assets/ntt-demo.png";
import nasaPresentation from "@/assets/nasa-presentation.png";
import nasaMap from "@/assets/nasa-map.png";
import nasaFormulas from "@/assets/nasa-formulas.png";
import devMonitorsArch from "@/assets/dev-monitors-architecture.png";
import csTaTeam from "@/assets/cs-ta-team.png";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityKyiv from "@/assets/city-kyiv.jpg";

// Fallback city photos used at the end of an experience dialog when no
// project-specific `endImage` is provided in the data file.
// To override for a single experience, set `endImage` (and optionally
// `endImageAlt`) on the project entry in `src/data/placeholder.ts`.
const CITY_FALLBACKS: Record<string, { src: string; alt: string }> = {
  "Barcelona, Spain": { src: cityBarcelona, alt: "View of Barcelona, Spain" },
  "Kyiv, Ukraine": { src: cityKyiv, alt: "View of Kyiv, Ukraine" },
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Tech PM", value: "tpm" },
  { label: "SWE", value: "engineering" },
  { label: "Data & ML", value: "data" },
  { label: "UI / UX", value: "uiux" },
  { label: "Education", value: "education" },
  { label: "Automation", value: "automation" },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter((p) => Array.isArray(p.filter) ? p.filter.includes(activeFilter) : p.filter === activeFilter);

  return (
    <div className="max-w-4xl mx-auto pt-16 md:pt-24">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-full md:w-2/5 shrink-0">
          <img
            src={workPhoto}
            alt="Sofiia working"
            className="rounded-lg object-cover w-full aspect-[4/3]"
          />
        </div>
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl md:text-4xl font-light tracking-[-1px] text-foreground mb-2">
            Experiences & Projects
          </h1>
          <p className="text-muted-foreground text-base leading-[1.8] mb-4">
            Filter and/or click on any experience to learn more.
          </p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                data-interactive
                className={`px-4 py-1.5 text-sm rounded-pill transition-colors ${
                  activeFilter === f.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-accent-light"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project list */}
      <AnimatePresence mode="popLayout">
        {filtered.map((project, i) => {
          const projectPositions = ["Founder & Math Instructor", "Technical Project Manager"];
          const isProject = projectPositions.includes(project.position);
          const labelText = isProject ? "Project" : "Work Experience";
          return (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
            whileHover={{
              borderColor: "hsl(145 27% 39%)",
              boxShadow: "0 4px 20px -4px hsla(145, 27%, 39%, 0.12)",
            }}
            onClick={() => setSelectedProject(project)}
            className="relative overflow-hidden bg-card border-hairline border-border rounded-lg p-6 pr-14 mb-3 cursor-pointer group"
            data-interactive
          >
            {/* Vertical side label */}
            <div
              className={`absolute top-0 right-0 h-full w-10 flex items-center justify-center ${
                isProject ? "bg-[hsl(25_45%_75%)]" : "bg-accent/30"
              }`}
            >
              <span
                className={`text-[11px] uppercase tracking-[2px] font-bold ${
                  isProject ? "text-[hsl(18_40%_25%)]" : "text-accent"
                }`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {labelText}
              </span>
            </div>

            {/* Position */}
            <h3 className="text-base font-bold text-accent mb-1">{project.position}</h3>

            {/* Company · Location · Date */}
            <div className="flex items-center gap-0 text-xs text-soft mb-3">
              <span>{project.company}</span>
              <span className="mx-2 text-muted-foreground font-medium">|</span>
              <span>{project.location}</span>
              <span className="mx-2 text-muted-foreground font-medium">|</span>
              <span>{project.period}</span>
            </div>

            {/* Bullet points */}
            <ul className="space-y-1 mb-3">
              {project.bullets.map((bullet, j) => (
                <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-accent mt-0.5 shrink-0">•</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <p className="text-sm text-accent font-medium cursor-pointer mb-3">
              Click here to learn more
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-pill">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="sm:max-w-lg bg-card">
            <DialogHeader className="text-left">
              <span className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2 block">
                {selectedProject.category}
              </span>
              <DialogTitle className="text-foreground text-xl mb-1">
                {selectedProject.position}
              </DialogTitle>
              <DialogDescription asChild>
                <div className="text-muted-foreground">
                  {/* Structured details */}
                  <div className="space-y-1.5 mt-2 mb-4">
                    <div className="flex gap-2 text-sm">
                      <span className="text-soft min-w-[80px]">Company</span>
                      <span className="text-foreground">{selectedProject.company}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-soft min-w-[80px]">Location</span>
                      <span className="text-foreground">{selectedProject.location}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-soft min-w-[80px]">Period</span>
                      <span className="text-foreground">{selectedProject.period}</span>
                    </div>
                  </div>

                  {/* Full description */}
                  <div className="text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {selectedProject.fullDescription}
                  </div>

                  {/* NTT project photos */}
                  {selectedProject.id === "1" && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <img src={nttTeam1} alt="NTT team photo" className="rounded-md w-full object-cover aspect-[4/3]" />
                      <img src={nttTeam2} alt="NTT team at office" className="rounded-md w-full object-cover aspect-[4/3]" />
                      <img src={nttDemo} alt="Shiawase app demo" className="rounded-md w-full object-cover object-top aspect-[4/3] col-span-2" />
                    </div>
                  )}

                  {/* NASA project photos */}
                  {selectedProject.id === "2" && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <img src={nasaPresentation} alt="NASA Space Apps presentation" className="rounded-md w-full object-cover aspect-[4/3] col-span-2" />
                      <img src={nasaMap} alt="Land Surface Temperature map" className="rounded-md w-full object-cover aspect-[4/3]" />
                      <img src={nasaFormulas} alt="Environmental metrics formulas" className="rounded-md w-full object-cover aspect-[4/3]" />
                    </div>
                  )}

                  {/* Development Monitors project photo */}
                  {selectedProject.id === "3" && (
                    <div className="mb-4">
                      <img src={devMonitorsArch} alt="Super-resolution model architecture" className="rounded-md w-full object-contain" />
                    </div>
                  )}

                  {/* CS Teaching Assistant photo */}
                  {selectedProject.id === "5" && (
                    <div className="mb-4">
                      <img src={csTaTeam} alt="CS Teaching Assistant session" className="rounded-md w-full object-cover aspect-[16/9]" />
                    </div>
                  )}

                  {/* Key contributions */}
                  <p className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2">
                    Key Contributions
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {selectedProject.bullets.map((bullet, j) => (
                      <li key={j} className="text-sm leading-relaxed flex gap-2">
                        <span className="text-accent mt-0.5 shrink-0">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* End-of-dialog image: prefers a project-specific `endImage`,
                      otherwise falls back to a city photo for the location. */}
                  {(() => {
                    const end = selectedProject.endImage
                      ? { src: selectedProject.endImage, alt: selectedProject.endImageAlt ?? selectedProject.location }
                      : CITY_FALLBACKS[selectedProject.location];
                    if (!end) return null;
                    return (
                      <div className="mt-2">
                        <img
                          src={end.src}
                          alt={end.alt}
                          loading="lazy"
                          className="rounded-md w-full object-cover aspect-[16/9]"
                        />
                        <p className="text-xs text-soft mt-1.5 text-center italic">
                          {selectedProject.location}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-pill">
                  {tag}
                </span>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
