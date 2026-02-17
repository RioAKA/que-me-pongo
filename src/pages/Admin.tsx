import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/hooks/useRole";
import { Navigate } from "react-router-dom";
import { Shield } from "lucide-react";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center">
        <p className="text-muted-foreground font-body">Cargando...</p>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-[80vh] container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-accent" />
        <h1 className="font-heading text-3xl font-bold">Panel de Administración</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold mb-2">Productos</h2>
          <p className="text-muted-foreground font-body text-sm">Gestiona el catálogo de productos de la tienda.</p>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold mb-2">Pedidos</h2>
          <p className="text-muted-foreground font-body text-sm">Revisa y gestiona los pedidos de los clientes.</p>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold mb-2">Usuarios</h2>
          <p className="text-muted-foreground font-body text-sm">Administra los usuarios y sus roles.</p>
        </div>
      </div>
    </main>
  );
};

export default Admin;
