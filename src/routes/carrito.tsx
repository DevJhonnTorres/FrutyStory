import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCart, removeFromCart, getCupos, onStoreChange, type CartItem } from "@/lib/store";
import { formatCOP } from "@/data/plans";
import { Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito — FrutyStory" },
      { name: "description", content: "Revisa tu reserva y paga solo el 30% de anticipo para asegurar tu espacio." },
    ],
  }),
  component: CarritoPage,
});

function CarritoPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cupos, setCupos] = useState(3);

  useEffect(() => {
    const r = () => {
      setItems(getCart());
      setCupos(getCupos());
    };
    r();
    return onStoreChange(r);
  }, []);

  const total = items.reduce((s, i) => s + i.price, 0);
  const anticipo = Math.round(total * 0.3);
  const saldo = total - anticipo;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-black">Tu carrito</h1>
        <p className="mt-2 text-muted-foreground">Reserva tu espacio pagando solo el <strong>30% de anticipo</strong>.</p>

        {items.length === 0 ? (
          <Card className="mt-10 flex flex-col items-center p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Tu carrito está vacío</p>
            <p className="mt-1 text-sm text-muted-foreground">Explora los planes y reserva tu espacio.</p>
            <Link to="/planes" className="mt-5"><Button>Ver planes</Button></Link>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((it, i) => (
                <Card key={i} className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <div className="font-display text-xl font-bold">Plan {it.name}</div>
                    <div className="text-sm text-muted-foreground">{it.episode}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-display text-lg font-black text-primary">{formatCOP(it.price)}</div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(i)} aria-label="Eliminar">
                      <Trash2 className="text-coral" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="h-fit p-6">
              <h2 className="font-display text-xl font-black">Resumen</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Total</span><span>{formatCOP(total)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Anticipo (30%)</span><span>{formatCOP(anticipo)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Saldo al rodar</span><span>{formatCOP(saldo)}</span></div>
              </div>
              <div className="mt-5 rounded-lg bg-coral/10 p-3 text-sm font-semibold text-coral">
                🔥 Cupos limitados — quedan {cupos} este mes
              </div>
              <Link to="/checkout" className="mt-5 block">
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                  Pagar anticipo {formatCOP(anticipo)}
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
