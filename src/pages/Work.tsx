import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { PROJECTS } from "@/data/placeholder";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import nttTeam1 from "@/assets/ntt-team-1.png";
import nttTeam2 from "@/assets/ntt-team-2.png";
import nttDemo from "@/assets/ntt-demo.png";
import nasaPresentation from "@/assets/nasa-presentation.png";
import nasaMap from "@/assets/nasa-map.png";
import nasaFormulas from "@/assets/nasa-formulas.png";
import devMonitorsArch from "@/assets/dev-monitors-architecture.png";
import csTaTeam from "@/assets/cs-ta-team.png";
import eveCallsLogo from "@/assets/eve-calls-logo.png";
import fuegoPresentation from "@/assets/fuego-presentation.png";
import houndLineLogo from "@/assets/hound-line-logo.png";
import cityKyiv from "@/assets/city-kyiv.jpg";

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

type ProjectPhoto = { src: string; alt: string; contain?: boolean };

const PROJECT_PHOTOS: Record<string, ProjectPhoto[]> = {
  "eve-calls": [{ src: eveCallsLogo, alt: "EVE.Calls logo", contain: true }],
  fuego: [{ src: fuegoPresentation, alt: "Sofiia presenting Fuego.Earth" }],
  "1": [
    { src: nttTeam1, alt: "NTT team photo" },
    { src: nttTeam2, alt: "NTT team at office" },
    { src: nttDemo, alt: "Shiawase app demo", contain: true },
  ],
  "2": [
    { src: nasaPresentation, alt: "NASA Space Apps presentation" },
    { src: nasaMap, alt: "Land Surface Temperature map", contain: true },
    { src: nasaFormulas, alt: "Environmental metrics formulas", contain: true },
  ],
  "3": [{ src: devMonitorsArch, alt: "Super-resolution model architecture", contain: true }],
  "4": [{ src: houndLineLogo, alt: "Hound Line — BI for Digital Transformation", contain: true }],
  "5": [{ src: csTaTeam, alt: "CS Teaching Assistant session" }],
  "6": [],
};

function ProjectGallery({ photos, company }: { photos: ProjectPhoto[]; company: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: photos.length > 1 }}
      aria-label={`${company} photos`}
      className="min-w-0 overflow-hidden rounded-md bg-secondary/30"
    >
      <CarouselContent className="ml-0">
        {photos.map((photo, index) => (
          <CarouselItem key={photo.src} className="pl-0" aria-label={`${index + 1} of ${photos.length}`}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
              className={`w-full aspect-[4/3] md:aspect-square bg-secondary ${photo.contain ? "object-contain" : "object-cover"}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 pt-6 bg-gradient-to-t from-black/40 to-transparent">
          <CarouselPrevious className="static translate-y-0 border-0 bg-white/90 text-foreground hover:bg-white" aria-label={`Previous ${company} photo`} />
          <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white" aria-live="polite">
            {current + 1} / {photos.length}
          </span>
          <CarouselNext className="static translate-y-0 border-0 bg-white/90 text-foreground hover:bg-white" aria-label={`Next ${company} photo`} />
        </div>
      )}
    </Carousel>
  );
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="max-w-4xl mx-auto pt-8 md:pt-10">
      <h1 className="text-3xl md:text-4xl font-light tracking-[-1px] text-foreground mb-4">
        Projects
      </h1>

      {/* Project list */}
        {[...PROJECTS].sort((a, b) => {
          const order = ["1", "fuego", "3", "2", "4", "eve-calls", "5", "6"];
          return order.indexOf(a.id) - order.indexOf(b.id);
        }).map((project) => {
          const projectPositions = ["Founder & Math Instructor", "SWE & TPM", "Co-founder"];
          const isProject = projectPositions.includes(project.position);
          const labelText = isProject ? "Project" : "Work Experience";
          const photos = [...(PROJECT_PHOTOS[project.id] ?? [])];
          if (project.endImage) {
            photos.push({ src: project.endImage, alt: project.endImageAlt ?? project.location });
          }
          return (
          <div
            key={project.id}
            className="relative overflow-hidden bg-card border-hairline border-border rounded-lg p-4 pr-12 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] gap-4 items-start mb-3"
          >
            {/* Vertical side label */}
            <div
              className={`absolute top-0 right-0 h-full w-8 flex items-center justify-center ${
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

            <div
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer min-w-0"
              data-interactive
            >
            {/* Position */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-base font-bold text-accent">{project.position}</h3>
              {project.links?.length > 0 && (
                <div className="flex items-center gap-1 shrink-0 -mt-1">
                  {project.links.map((link) => {
                    const Icon = link.kind === "github" ? GitHubLogo : Globe;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:text-accent hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Company · Location · Date */}
            <div className="flex flex-wrap items-center gap-y-1 text-xs text-soft mb-2">
              <span>{project.company}</span>
              <span className="mx-2 text-muted-foreground font-medium">|</span>
              <span>{project.location}</span>
              <span className="mx-2 text-muted-foreground font-medium">|</span>
              <span>{project.period}</span>
            </div>

            {project.id === "fuego" && <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>}
            {/* Bullet points */}
            <ul className="space-y-1 mb-2">
              {project.bullets.map((bullet, j) => (
                <li key={j} className="text-sm text-muted-foreground leading-[1.45] flex gap-2">
                  <span className="text-accent mt-0.5 shrink-0">•</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedProject(project);
              }}
              className="text-sm text-accent font-medium cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Click here to learn more
            </button>
            </div>
          {photos.length > 0 && <ProjectGallery photos={photos} company={project.company} />}
          </div>
          );
        })}

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
