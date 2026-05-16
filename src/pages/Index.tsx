import { useState } from "react";
import { motion } from "framer-motion";
import { OWNER, EDUCATION, Education } from "@/data/placeholder";
import profilePhoto from "@/assets/profile-photo.jpg";
import Work from "./Work";
import Thoughts from "./Thoughts";
import Contact from "./Contact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function PhotoCard() {
  return (
    <div className="w-[220px] md:w-[220px] rounded-lg overflow-hidden mx-auto md:mx-0">
      <img
        src={profilePhoto}
        alt={OWNER.fullName}
        width={512}
        height={640}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
}

export default function Hello() {
  const [selectedEdu, setSelectedEdu] = useState<Education | null>(null);

  return (
    <div>
      {/* Hello Section */}
      <section id="hello" className="max-w-4xl mx-auto pt-16 md:pt-24">
        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Text first on mobile, second on desktop */}
          <div className="flex-1 min-w-0 flex flex-col order-1 md:order-2">
            <p className="text-muted-foreground text-lg md:text-xl mb-2">
              <span className="wave-emoji">👋</span> Hey, I'm{" "}
              <span className="text-accent font-medium text-xl md:text-2xl">{OWNER.fullName}</span>
            </p>
            <h1 className="text-4xl md:text-[52px] font-light leading-tight tracking-[-2px] text-foreground mb-4">
              {OWNER.headline}{" "}
              <em className="text-accent not-italic" style={{ fontStyle: "italic" }}>
                {OWNER.headlineHighlight}
              </em>
            </h1>
            <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-lg md:block hidden">
              {OWNER.tagline}
            </p>
            <div className="gap-3 md:flex hidden">
              <a
                href="#work"
                data-interactive
                className="bg-foreground text-primary-foreground px-5 py-2.5 rounded-btn text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View my work
              </a>
              <a
                href="#contact"
                data-interactive
                className="border-hairline border-border text-foreground px-5 py-2.5 rounded-btn text-sm font-medium hover:bg-secondary transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
          {/* Photo second on mobile (smaller), first on desktop */}
          <div className="shrink-0 order-2 md:order-1 w-full md:w-auto">
            <PhotoCard />
          </div>
          {/* Tagline and CTAs after photo on mobile */}
          <div className="flex flex-col order-3 md:hidden w-full">
            <p className="text-muted-foreground text-base leading-[1.8] mb-6 max-w-lg">
              {OWNER.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href="#work"
                data-interactive
                className="bg-foreground text-primary-foreground px-5 py-2.5 rounded-btn text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View my work
              </a>
              <a
                href="#contact"
                data-interactive
                className="border-hairline border-border text-foreground px-5 py-2.5 rounded-btn text-sm font-medium hover:bg-secondary transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 md:mt-24">
          <p className="text-[10px] uppercase tracking-[1.8px] text-muted-foreground mb-6">Education</p>
          <div className="flex flex-col gap-4">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                onClick={() => setSelectedEdu(edu)}
                className="bg-card border-hairline border-border rounded-lg p-6 cursor-pointer group hover:border-accent/40 hover:shadow-[0_4px_20px_-4px_hsla(145,27%,39%,0.12)] transition-all"
                data-interactive
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-accent mb-3">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-soft whitespace-nowrap block">{edu.period}</span>
                    {edu.location && <span className="text-xs text-soft whitespace-nowrap block">{edu.location}</span>}
                  </div>
                </div>
                {edu.details && (
                  <ul className="space-y-1.5">
                    {edu.details.map((detail, j) => {
                      const [text] = detail.split("||");
                      return (
                        <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-accent mt-1.5 shrink-0">·</span>
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="text-sm text-accent font-medium mt-3">
                  Click here to learn more
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Detail Dialog */}
        <Dialog open={!!selectedEdu} onOpenChange={(open) => !open && setSelectedEdu(null)}>
          {selectedEdu && (
            <DialogContent className="sm:max-w-lg bg-card">
              <DialogHeader className="text-left">
                <span className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2 block">
                  Education
                </span>
                <DialogTitle className="text-foreground text-xl mb-1">
                  <a href="https://www.minerva.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline underline-offset-2">
                    {selectedEdu.institution}
                  </a>
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-muted-foreground">
                    <div className="space-y-1.5 mt-2 mb-4">
                      <div className="flex gap-2 text-sm">
                        <span className="text-soft min-w-[100px]">Degree</span>
                        <span className="text-foreground">{selectedEdu.degree}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-soft min-w-[100px]">Graduation</span>
                        <span className="text-foreground">May 2028</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-soft min-w-[100px]">GPA</span>
                        <span className="text-foreground">3.6 / 4</span>
                      </div>
                      {selectedEdu.location && (
                        <div className="flex gap-2 text-sm">
                          <span className="text-soft min-w-[100px]">Location</span>
                          <span className="text-foreground">{selectedEdu.location}</span>
                        </div>
                      )}
                    </div>

                    {selectedEdu.details && (
                      <>
                        <p className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2">
                          Details
                        </p>
                        <ul className="space-y-1.5">
                          {selectedEdu.details.map((detail, j) => {
                            const [text, href] = detail.split("||");
                            return (
                              <li key={j} className="text-sm leading-relaxed flex gap-2">
                                <span className="text-accent mt-0.5 shrink-0">•</span>
                                {href ? (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline underline-offset-2">
                                    {text}
                                  </a>
                                ) : text}
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}

                    <p className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2 mt-4">
                      CS Courses
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Problem Solving with Data Structures and Algorithms",
                        "Harnessing Artificial Intelligence Algorithms",
                        "Software Development: Building Powerful Applications",
                        "Formal Analyses",
                        "Empirical Analyses",
                        "Linear Algebra",
                        "Calculus",
                      ].map((course, j) => (
                        <li key={j} className="text-sm leading-relaxed flex gap-2">
                          <span className="text-accent mt-0.5 shrink-0">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2 mt-4">
                      SS Courses
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Theory, Research, and Innovation in the Psychological Sciences",
                        "Psychology: From Neurons to Society",
                        "Multimodal Communications",
                        "Modern Economic Thought",
                        "Complex Systems",
                      ].map((course, j) => (
                        <li key={j} className="text-sm leading-relaxed flex gap-2">
                          <span className="text-accent mt-0.5 shrink-0">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[10px] uppercase tracking-[1.8px] text-accent mb-2 mt-4">
                      Other
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Global Learning",
                        "Cornerstone Civic Project",
                        "Special Topics in Japanese Society and Culture",
                        "Japan Civic Project",
                        "Human Subjects Research Workshops",
                        "Teaching Assistant Training",
                      ].map((course, j) => (
                        <li key={j} className="text-sm leading-relaxed flex gap-2">
                          <span className="text-accent mt-0.5 shrink-0">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      </section>

      {/* Work Section */}
      <section id="work" className="scroll-mt-[76px]">
        <Work />
      </section>

      {/* Thoughts Section */}
      <section id="thoughts" className="scroll-mt-[76px]">
        <Thoughts />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-[76px]">
        <Contact />
      </section>

      {/* Footer */}
      <div className="flex flex-col items-center pt-16 pb-8 text-muted-foreground text-sm font-light tracking-wide">
        <span>Thank you for visiting my website 🌿</span>
        <span
          className="mt-1 text-3xl text-accent"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 500 }}
        >
          Sofiia Bilyk
        </span>
      </div>
    </div>
  );
}
