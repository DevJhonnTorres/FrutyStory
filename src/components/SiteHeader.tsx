import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { getCart, onStoreChange } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const refresh = () => setCount(getCart().length);
    refresh();
    return onStoreChange(refresh);
  }, []);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/planes", label: "Planes" },
    { to: "/casos", label: "Casos" },
    { to: "/servicios", label: "Servicios" },
    { to: "/contacto", label: "Contacto" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-black tracking-tight text-primary">
            Fruty<span className="text-gradient-gold">Story</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/carrito">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart />
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-coral-foreground">
                  {count}
                </span>
              )}
            </Button>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/50 bg-background md:hidden">
          <div className="container mx-auto flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
