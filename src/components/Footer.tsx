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
            <Link to="/catalog?category=camisetas" className="hover:text-accent transition-colors">Remeras</Link>
            <Link to="/catalog?category=chaquetas" className="hover:text-accent transition-colors">Abrigos</Link>
            <Link to="/catalog?category=accesorios" className="hover:text-accent transition-colors">Pantalones</Link>
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
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <a href="https://wa.me/5493563406523" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/quemepongobalnearia" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
          </div>
          <div className="mt-4">
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
