import { motion } from "framer-motion";
import { CONTACTS } from "@/data/placeholder";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-light tracking-[-1px] text-foreground mb-3">Let's talk.</h1>
      <p className="text-muted-foreground text-base leading-[1.8] mb-12 whitespace-nowrap">
        I'd love to hear from you. Pick your preferred channel to connect below.
      </p>

      <div className="border-t-hairline border-border">
        {CONTACTS.map((contact, i) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            download={contact.type === "download" ? true : undefined}
            target={contact.type === "link" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center justify-between py-5 border-b-hairline border-border group hover:bg-accent-light/50 px-2 -mx-2 rounded-sm transition-colors"
            data-interactive
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[1.8px] text-muted-foreground w-16">{contact.label}</span>
              <span className="text-sm text-foreground group-hover:text-accent transition-colors">{contact.value}</span>
            </div>
            <span className="text-muted-foreground text-sm">{contact.type === "download" ? "↓" : "↗"}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
