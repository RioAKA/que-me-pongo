import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import type { LucideIcon } from "lucide-react";

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12.186 24h-.007C5.965 23.97.28 18.54.007 12.286-.267 5.748 5.073.027 11.612 0h.012c3.3.015 6.063 1.188 8.212 3.49l-2.16 2.27C15.984 3.907 14.15 3.01 12.002 3c-4.932.02-8.94 4.072-8.98 9.043-.04 4.97 3.905 9.043 8.84 9.08 2.74.02 4.76-.87 6.12-2.31.98-1.04 1.6-2.37 1.8-3.85-1.09.21-2.4.33-3.76.33-5.13 0-8.72-2.14-8.84-6.53-.07-2.58 1.14-5.1 4.97-5.1 2.14 0 3.7.76 4.63 2.26.85 1.38 1.11 3.2.76 5.4l-.02.1c-.17.95-.93 1.6-1.89 1.6-.56 0-.94-.24-1.1-.7-.13-.37-.12-.81.02-1.3l1.1-4.82h-2.61l-.26 1.1c-.5-.85-1.42-1.32-2.6-1.32-2.4 0-3.9 1.87-3.9 4.07 0 2.35 1.43 3.9 3.56 3.9 1.24 0 2.27-.56 2.95-1.53.32.97 1.22 1.53 2.47 1.53 2.07 0 3.68-1.34 4.05-3.37.44-2.71.08-5.13-1.05-6.96C18.36 4.25 15.9 3 12.62 3h-.01" />
  </svg>
);

interface SocialLink {
  name: string;
  icon: LucideIcon | React.FC;
  href: string;
  bg: string;
}

const socials: SocialLink[] = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/qmp",
    bg: "bg-secondary hover:bg-accent/20",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/qmp",
    bg: "bg-secondary hover:bg-accent/20",
  },
  {
    name: "Threads",
    icon: ThreadsIcon,
    href: "https://threads.net/@qmp",
    bg: "bg-secondary hover:bg-accent/20",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/5491112345678",
    bg: "bg-secondary hover:bg-accent/20",
  },
  {
    name: "Correo Electrónico",
    icon: Mail,
    href: "mailto:hola@qmp.com",
    bg: "bg-secondary hover:bg-accent/20",
  },
];

const Social = () => (
  <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-sm space-y-8 animate-fade-in">
      <div className="flex flex-col items-center gap-3">
        <img src={logo} alt="QMP?" className="h-20 w-20 rounded-full shadow-lg" />
        <h1 className="font-heading text-2xl font-bold">QMP?</h1>
        <p className="font-body text-sm text-muted-foreground text-center">
          Seguinos en nuestras redes sociales
        </p>
      </div>

      <div className="space-y-3">
        {socials.map(({ name, icon: Icon, href, bg }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 w-full px-6 py-4 rounded-full ${bg} font-body font-medium transition-all duration-200 hover:scale-[1.03] hover:shadow-md`}
          >
            <Icon className="h-5 w-5" />
            <span>{name}</span>
          </a>
        ))}
      </div>
    </div>
  </main>
);

export default Social;
