import { CONTACTS } from "@/data/placeholder";

export default function Contact() {
  return (
    <address id="contact" className="scroll-mt-24 not-italic text-sm">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            aria-label={`${contact.label}: ${contact.value}`}
            download={contact.type === "download" ? true : undefined}
            target={contact.href.startsWith("https://") ? "_blank" : undefined}
            rel={contact.href.startsWith("https://") ? "noopener noreferrer" : undefined}
            className="text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors"
          >
            {contact.label === "Email" || contact.label === "Phone" ? contact.value : contact.label}
            {contact.type === "download" ? " ↓" : ""}
          </a>
        ))}
      </div>
    </address>
  );
}
