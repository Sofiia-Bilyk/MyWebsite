import { OWNER } from "@/data/placeholder";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useId, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Work from "./Work";
import Thoughts from "./Thoughts";
import Contact from "./Contact";

function Introduction() {
  return (
    <>
      <p className="mb-2">
        I'm a junior at{" "}
        <a
          href="https://www.minerva.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Minerva University
        </a>{" "}
        in San Francisco, CA, studying AI and human behavior.
      </p>
      <p className="mx-auto max-w-[320px]">I've studied and lived in the US, Japan, Spain, and Ukraine, which taught me how differently people think, work, and expect technology to behave. I build with that in mind.</p>
    </>
  );
}

function CircleIntroduction() {
  const section = useRef<HTMLElement>(null);
  const clipId = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const [introVisible, setIntroVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setIntroVisible(progress >= 0.98);
  });
  // Final center distance gives approximately 50% overlap by area.
  const left = useTransform(scrollYProgress, [0, 1], [200, 355]);
  const right = useTransform(scrollYProgress, [0, 1], [800, 645]);
  const radius = useTransform(scrollYProgress, [0, 1], [270, 360]);
  const intersectionOutline = useTransform(scrollYProgress, [0, .12], [0, 1]);
  return (
    <section ref={section} className="circle-story" aria-label="Where technology meets people">
      <div className="circle-story-sticky">
        <div className="circle-story-art" aria-hidden="true">
          <svg viewBox="0 0 1000 800" className="circle-story-svg">
            <defs><clipPath id={clipId}><motion.circle cx={reduce ? 355 : left} cy="400" r={reduce ? 360 : radius} /></clipPath><clipPath id={clipId + "-right"}><motion.circle cx={reduce ? 645 : right} cy="400" r={reduce ? 360 : radius} /></clipPath></defs>
            <motion.circle cx={reduce ? 355 : left} cy="400" r={reduce ? 360 : radius} fill="#80b5ed" fillOpacity="0.55" />
            <motion.circle cx={reduce ? 645 : right} cy="400" r={reduce ? 360 : radius} fill="#f5d96b" fillOpacity="0.55" />
            <motion.circle cx={reduce ? 645 : right} cy="400" r={reduce ? 360 : radius} fill="#a5c98a" fillOpacity="0.72" clipPath={"url(#" + clipId + ")"} />
            <motion.circle cx={reduce ? 355 : left} cy="400" r={reduce ? 360 : radius} fill="none" stroke="#427eb8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.circle cx={reduce ? 645 : right} cy="400" r={reduce ? 360 : radius} fill="none" stroke="#c3a031" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.g style={{ opacity: reduce ? 1 : intersectionOutline }} fill="none" stroke="#285c3b" strokeWidth="2">
              <motion.circle cx={reduce ? 645 : right} cy="400" r={reduce ? 360 : radius} clipPath={"url(#" + clipId + ")"} vectorEffect="non-scaling-stroke" />
              <motion.circle cx={reduce ? 355 : left} cy="400" r={reduce ? 360 : radius} clipPath={"url(#" + clipId + "-right)"} vectorEffect="non-scaling-stroke" />
            </motion.g>
            <motion.g className="circle-story-labels" fill="#233329" textAnchor="middle">
              <text x="140" y="405">Technology</text><text x="810" y="405">People</text>
            </motion.g>
          </svg>
        </div>
        <div className="circle-story-intro" hidden={!reduce && !introVisible}>
          <p className="text-4xl md:text-5xl italic" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>me</p>
        </div>
      </div>
    </section>
  );
}

export default function Hello() {
  return (
    <div>
      <section id="hello" className="portfolio-hero">
        <img src={profilePhoto} alt={OWNER.fullName} width={512} height={640} className="portfolio-hero-photo" />
        <div className="portfolio-hero-copy">
          <p className="portfolio-hero-greeting">👋 Hey, I'm <strong>{OWNER.fullName}</strong></p>
          <h1 className="portfolio-hero-headline">Building solutions for <em>people.</em></h1>
          <div className="portfolio-hero-bio"><Introduction /></div>
        </div>
      </section>

      <CircleIntroduction />

      <div className="circle-story-contact mx-auto max-w-4xl py-8 md:py-12">
        <Contact />
      </div>

      {/* Work Section */}
      <section id="work" className="scroll-mt-[76px]">
        <Work />
      </section>

      {/* Thoughts Section */}
      <section id="thoughts" className="scroll-mt-[76px]">
        <Thoughts />
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
