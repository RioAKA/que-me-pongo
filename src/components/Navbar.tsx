import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRole } from "@/hooks/useRole";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { totalItems, openCart } = useCart();
  const { isAdmin } = useRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="QMP?" className="h-10 w-10 rounded-full" />
          <span className="font-heading text-xl font-bold tracking-tight">QMP?</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
          <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
          <Link to="/catalog" className="hover:text-accent transition-colors">Catálogo</Link>
          <Link to="/catalog?category=remeras" className="hover:text-accent transition-colors">Remeras</Link>
          <Link to="/catalog?category=abrigos" className="hover:text-accent transition-colors">Abrigos</Link>
          <Link to="/catalog?category=pantalones" className="hover:text-accent transition-colors">Pantalones</Link>
          <Link to="/promos" className="hover:text-accent transition-colors font-bold text-destructive">PROMOS</Link>
          <Link to="/social" className="hover:text-accent transition-colors">Redes sociales</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-accent transition-colors flex items-center gap-1">
              <Shield className="h-4 w-4" />Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut} className="hidden md:inline-flex text-sm">
              Cerrar sesión
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
            </Link>
          )}
          <button onClick={openCart} className="relative p-2 hover:text-accent transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-3 animate-fade-in">
          <Link to="/" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent">Inicio</Link>
          <Link to="/catalog" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent">Catálogo</Link>
          <Link to="/promos" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent font-bold text-destructive">PROMOS</Link>
          <Link to="/social" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent">Redes sociales</Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent flex items-center gap-1">
              <Shield className="h-4 w-4" />Admin
            </Link>
          )}
          {user ? (
            <button onClick={() => { signOut(); setMobileOpen(false); }} className="py-2 text-left hover:text-accent">Cerrar sesión</button>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)} className="py-2 hover:text-accent">Iniciar sesión</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
