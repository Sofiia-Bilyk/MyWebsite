import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { POSTS, Post } from "@/data/placeholder";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Neural node positions (percentage-based for responsiveness)
const NODE_POSITIONS_DESKTOP = [
  { x: 15, y: 18 },
  { x: 55, y: 8 },
  { x: 82, y: 22 },
  { x: 8, y: 55 },
  { x: 42, y: 45 },
  { x: 75, y: 52 },
  { x: 25, y: 80 },
  { x: 60, y: 78 },
];

// Mobile: spread nodes more evenly with better horizontal distribution
const NODE_POSITIONS_MOBILE = [
  { x: 22, y: 10 },
  { x: 70, y: 14 },
  { x: 88, y: 32 },
  { x: 12, y: 36 },
  { x: 50, y: 42 },
  { x: 85, y: 58 },
  { x: 18, y: 68 },
  { x: 58, y: 82 },
];

// Connections between nodes (indices)
const CONNECTIONS = [
  [0, 1], [1, 2], [0, 4], [1, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 7], [6, 7],
  [0, 3], [2, 5], [1, 5],
];

export default function Thoughts() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const isMobile = useIsMobile();
  const NODE_POSITIONS = isMobile ? NODE_POSITIONS_MOBILE : NODE_POSITIONS_DESKTOP;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getConnectedNodes = (idx: number) =>
    CONNECTIONS.filter(([a, b]) => a === idx || b === idx)
      .map(([a, b]) => (a === idx ? b : a));

  return (
    <div className="max-w-4xl mx-auto pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-light tracking-[-1px] text-foreground mb-2">
        Thoughts
      </h1>
      <p className="text-muted-foreground text-base leading-[1.8] mb-10 max-w-lg">
        Notes on building, leading, and learning.
      </p>

      {/* Neural network container */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: isMobile ? "560px" : "clamp(420px, 60vw, 600px)" }}
      >
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {dims.w > 0 &&
            CONNECTIONS.map(([a, b], i) => {
              const posA = NODE_POSITIONS[a];
              const posB = NODE_POSITIONS[b];
              if (!posA || !posB) return null;

              const x1 = (posA.x / 100) * dims.w;
              const y1 = (posA.y / 100) * dims.h;
              const x2 = (posB.x / 100) * dims.w;
              const y2 = (posB.y / 100) * dims.h;

              const isHighlighted =
                hoveredIdx !== null &&
                (a === hoveredIdx || b === hoveredIdx);

              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeLinecap="round"
                  stroke="hsl(var(--accent))"
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={isHighlighted ? 0.6 : 0.15}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                />
              );
            })}

          {/* Animated pulses along connections */}
          {dims.w > 0 &&
            CONNECTIONS.map(([a, b], i) => {
              const posA = NODE_POSITIONS[a];
              const posB = NODE_POSITIONS[b];
              if (!posA || !posB) return null;

              const x1 = (posA.x / 100) * dims.w;
              const y1 = (posA.y / 100) * dims.h;
              const x2 = (posB.x / 100) * dims.w;
              const y2 = (posB.y / 100) * dims.h;

              return (
                <circle key={`pulse-${i}`} r="2" fill="hsl(var(--accent))" opacity="0.4">
                  <animateMotion
                    dur={`${3 + (i % 3)}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              );
            })}
        </svg>

        {/* Nodes */}
        {POSTS.slice(0, NODE_POSITIONS.length).map((post, i) => {
          const pos = NODE_POSITIONS[i];
          const isHovered = hoveredIdx === i;
          const isConnected = hoveredIdx !== null && getConnectedNodes(hoveredIdx).includes(i);
          const isDimmed = hoveredIdx !== null && !isHovered && !isConnected;

          return (
            <motion.div
              key={post.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: isHovered ? 20 : 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: "spring" }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              onClick={() => setSelectedPost(post)}
              data-interactive
            >
              <motion.div
                className="relative -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: isHovered ? 1.8 : isConnected ? 1.05 : 1,
                  opacity: isDimmed ? 0.4 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--accent) / ${isHovered ? 0.3 : 0.08}) 0%, transparent 70%)`,
                    transform: "scale(2.5)",
                  }}
                />

                {/* Node circle */}
                <div
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md"
                  style={{
                    backgroundColor: post.color,
                    borderColor: isHovered
                      ? "hsl(var(--accent))"
                      : "hsl(var(--border))",
                    boxShadow: isHovered
                      ? "0 0 20px hsl(var(--accent) / 0.3)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <span className="text-base md:text-lg">{post.emoji}</span>
                </div>

                {/* Label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none"
                  style={{ width: isHovered ? "9rem" : "4.5rem" }}
                  animate={{ opacity: isHovered ? 1 : 0.5 }}
                >
                  <p className={`font-medium text-foreground leading-tight ${isHovered ? "text-[9px] md:text-[10px]" : "text-[7px] md:text-[8px] line-clamp-2"}`}>
                    {post.title}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{selectedPost?.emoji}</span>
              <span className="text-xs uppercase tracking-widest text-soft">
                {selectedPost?.tag}
              </span>
            </div>
            <DialogTitle className="text-lg font-medium text-foreground leading-snug">
              {selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-soft mt-1">
              {selectedPost?.date}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 text-sm text-muted-foreground leading-[1.8] whitespace-pre-line">
            {selectedPost?.fullStory}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
