import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReservas, type Reserva } from "@/lib/store";
import { formatCOP } from "@/data/plans";
import { CheckCircle2, Calendar, Film, Send, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/checkout/confirmacion")({
  head: () => ({
    meta: [
      { title: "Reserva confirmada — FrutyStory" },
      { name: "description", content: "Tu reserva quedó registrada y está pendiente de aprobación manual." },
    ],
  }),
  component: ConfPage,
});

const STEPS = [
  { icon: Calendar, t: "Reserva", d: "Anticipo recibido" },
  { icon: Film, t: "Producción", d: "Grabamos tu integración" },
  { icon: Send, t: "Publicación", d: "Episodio al aire" },
  { icon: BarChart3, t: "Resultados", d: "Reporte de métricas" },
];

function ConfPage() {
  const [reserva, setReserva] = useState<Reserva | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("fs_last_reserva");
    const r = getReservas().find((x) => x.id === id) ?? getReservas()[0] ?? null;
    setReserva(r);
  }, []);

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <Card className="overflow-hidden">
          <div className="bg-blobs p-10 text-center text-deep-foreground">
            <CheckCircle2 className="mx-auto h-16 w-16 text-gold" />
            <h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">¡Reserva recibida!</h1>
            <p className="mt-2 text-deep-foreground/80">Tu pago está siendo verificado manualmente. Te contactamos en menos de 24h.</p>
            {reserva && (
              <div className="mx-auto mt-5 inline-block rounded-full bg-white/10 px-4 py-1.5 font-mono text-sm">
                ID: {reserva.id}
              </div>
            )}
          </div>

          <div className="p-8">
            <h2 className="font-display text-xl font-black">Próximos pasos</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {STEPS.map((s, i) => (
                <div key={s.t} className={`rounded-xl border p-4 text-center ${i === 0 ? "border-gold bg-gold/10" : "border-border"}`}>
                  <s.icon className={`mx-auto h-6 w-6 ${i === 0 ? "text-gold" : "text-muted-foreground"}`} />
                  <div className="mt-2 text-sm font-bold">{s.t}</div>
                  <div className="text-xs text-muted-foreground">{s.d}</div>
                </div>
              ))}
            </div>

            {reserva && (
              <div className="mt-7 rounded-xl bg-muted p-5 text-sm">
                <h3 className="font-display text-lg font-bold">Resumen</h3>
                <div className="mt-2 space-y-1">
                  <div><span className="text-muted-foreground">Empresa:</span> <strong>{reserva.checkout.empresa}</strong></div>
                  <div><span className="text-muted-foreground">Total:</span> {formatCOP(reserva.total)} · <span className="text-muted-foreground">Anticipo:</span> <strong>{formatCOP(reserva.anticipo)}</strong></div>
                  <div><span className="text-muted-foreground">Estado:</span> <span className="font-semibold text-coral">{reserva.status.replace("_", " ")}</span></div>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/" className="flex-1"><Button variant="outline" className="w-full">Volver al inicio</Button></Link>
              <Link to="/admin" className="flex-1"><Button className="w-full">Ver mis reservas</Button></Link>
            </div>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
