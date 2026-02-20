import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import PaymentIcons from "@/components/PaymentIcons";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="QMP?" className="h-10 w-10 rounded-full" />
            <h3 className="font-heading text-2xl font-bold">QMP?</h3>
          </div>
          <p className="text-primary-foreground/70 font-body text-sm leading-relaxed">
            Moda urbana con actitud. Estilo que habla por ti.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Tienda</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/catalog" className="hover:text-accent transition-colors">Catálogo</Link>
            <Link to="/catalog?category=remeras" className="hover:text-accent transition-colors">Remeras</Link>
            <Link to="/catalog?category=abrigos" className="hover:text-accent transition-colors">Abrigos</Link>
            <Link to="/catalog?category=pantalones" className="hover:text-accent transition-colors">Pantalones</Link>
            <Link to="/promos" className="hover:text-accent transition-colors">Promos</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Info</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <span>Envíos y devoluciones</span>
            <span>Política de privacidad</span>
            <span>Términos y condiciones</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Contacto</h4>
          <div className="flex flex-row gap-3 mb-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/5493563406523"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 hover:brightness-110"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.85L0 24l6.344-1.51A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.368l-.36-.213-3.767.897.934-3.666-.234-.376A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/quemepongobalnearia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 hover:brightness-110"
              style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100054207144449"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 hover:brightness-110"
              style={{ backgroundColor: "#1877F2" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>

            {/* Threads */}
            <a
              href="https://www.threads.com/@quemepongobalnearia?xmt=AQF09f88tfzOGXpRRh1L-b5GhOCu9RJ1hyCPrIuhlBEnius"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 hover:brightness-110"
              style={{ backgroundColor: "#000000" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
                <path d="M12.186 24h-.007C5.965 23.97.28 18.54.007 12.286-.267 5.748 5.073.027 11.612 0h.012c3.3.015 6.063 1.188 8.212 3.49l-2.16 2.27C15.984 3.907 14.15 3.01 12.002 3c-4.932.02-8.94 4.072-8.98 9.043-.04 4.97 3.905 9.043 8.84 9.08 2.74.02 4.76-.87 6.12-2.31.98-1.04 1.6-2.37 1.8-3.85-1.09.21-2.4.33-3.76.33-5.13 0-8.72-2.14-8.84-6.53-.07-2.58 1.14-5.1 4.97-5.1 2.14 0 3.7.76 4.63 2.26.85 1.38 1.11 3.2.76 5.4l-.02.1c-.17.95-.93 1.6-1.89 1.6-.56 0-.94-.24-1.1-.7-.13-.37-.12-.81.02-1.3l1.1-4.82h-2.61l-.26 1.1c-.5-.85-1.42-1.32-2.6-1.32-2.4 0-3.9 1.87-3.9 4.07 0 2.35 1.43 3.9 3.56 3.9 1.24 0 2.27-.56 2.95-1.53.32.97 1.22 1.53 2.47 1.53 2.07 0 3.68-1.34 4.05-3.37.44-2.71.08-5.13-1.05-6.96C18.36 4.25 15.9 3 12.62 3h-.01"/>
              </svg>
            </a>
          </div>
          <div className="mt-2">
            <h4 className="font-heading font-semibold mb-2 text-sm">Medios de pago</h4>
            <PaymentIcons />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm text-primary-foreground/50">
        © 2026 QMP? Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
