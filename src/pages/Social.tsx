import { Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.85L0 24l6.344-1.51A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.368l-.36-.213-3.767.897.934-3.666-.234-.376A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const ThreadsIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12.186 24h-.007C5.965 23.97.28 18.54.007 12.286-.267 5.748 5.073.027 11.612 0h.012c3.3.015 6.063 1.188 8.212 3.49l-2.16 2.27C15.984 3.907 14.15 3.01 12.002 3c-4.932.02-8.94 4.072-8.98 9.043-.04 4.97 3.905 9.043 8.84 9.08 2.74.02 4.76-.87 6.12-2.31.98-1.04 1.6-2.37 1.8-3.85-1.09.21-2.4.33-3.76.33-5.13 0-8.72-2.14-8.84-6.53-.07-2.58 1.14-5.1 4.97-5.1 2.14 0 3.7.76 4.63 2.26.85 1.38 1.11 3.2.76 5.4l-.02.1c-.17.95-.93 1.6-1.89 1.6-.56 0-.94-.24-1.1-.7-.13-.37-.12-.81.02-1.3l1.1-4.82h-2.61l-.26 1.1c-.5-.85-1.42-1.32-2.6-1.32-2.4 0-3.9 1.87-3.9 4.07 0 2.35 1.43 3.9 3.56 3.9 1.24 0 2.27-.56 2.95-1.53.32.97 1.22 1.53 2.47 1.53 2.07 0 3.68-1.34 4.05-3.37.44-2.71.08-5.13-1.05-6.96C18.36 4.25 15.9 3 12.62 3h-.01"/>
  </svg>
);

interface SocialLink {
  name: string;
  Icon: React.FC<{ size?: number }>;
  href: string;
  hoverColor: string;
  disabled?: boolean;
}

const socials: SocialLink[] = [
  {
    name: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/quemepongobalnearia",
    hoverColor: "#E1306C",
  },
  {
    name: "Facebook",
    Icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=100054207144449",
    hoverColor: "#1877F2",
  },
  {
    name: "Threads",
    Icon: ThreadsIcon,
    href: "https://www.threads.com/@quemepongobalnearia?xmt=AQF09f88tfzOGXpRRh1L-b5GhOCu9RJ1hyCPrIuhlBEnius",
    hoverColor: "#000000",
  },
  {
    name: "WhatsApp",
    Icon: WhatsAppIcon,
    href: "https://wa.me/5493563406523",
    hoverColor: "#25D366",
  },
  {
    name: "Correo Electrónico",
    Icon: ({ size = 20 }) => <Mail size={size} />,
    href: "#",
    hoverColor: "#6b7280",
    disabled: true,
  },
];

const SocialButton = ({ name, Icon, href, hoverColor, disabled }: SocialLink) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      className={`flex items-center gap-3 w-full px-6 py-4 rounded-full bg-secondary font-body font-medium transition-all duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.03] hover:shadow-md"
      }`}
      style={{
        color: hovered && !disabled ? hoverColor : undefined,
        transition: "color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Icon size={20} />
      <span>{name}</span>
    </a>
  );
};

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
        {socials.map((social) => (
          <SocialButton key={social.name} {...social} />
        ))}
      </div>
    </div>
  </main>
);

export default Social;
