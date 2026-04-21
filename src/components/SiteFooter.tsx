import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-blobs mt-20 text-deep-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="text-2xl font-display font-black">
            Fruty<span className="text-gradient-gold">Story</span>
          </div>
          <p className="mt-3 text-sm text-deep-foreground/75">
            La serie viral donde tu marca se vuelve protagonista.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gold">Navegación</h4>
          <ul className="mt-3 space-y-2 text-sm text-deep-foreground/80">
            <li><Link to="/planes">Planes</Link></li>
            <li><Link to="/casos">Casos</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gold">Reservas</h4>
          <ul className="mt-3 space-y-2 text-sm text-deep-foreground/80">
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/admin">Admin (demo)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gold">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm text-deep-foreground/80">
            <li>hola@frutystory.co</li>
            <li>+57 300 000 0000</li>
            <li>Bogotá · Colombia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-deep-foreground/60">
        © {new Date().getFullYear()} FrutyStory. Todos los derechos reservados.
      </div>
    </footer>
  );
}
