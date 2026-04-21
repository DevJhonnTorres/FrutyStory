import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCupos, setCupos, getReservas, updateReservaStatus, onStoreChange, type Reserva } from "@/lib/store";
import { formatCOP } from "@/data/plans";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin (demo) — FrutyStory" },
      { name: "description", content: "Panel demo local: gestiona cupos y aprueba reservas." },
    ],
  }),
  component: AdminPage,
});

const STATUSES: Reserva["status"][] = ["pendiente", "pago_subido", "aprobado", "en_produccion"];

function AdminPage() {
  const [cupos, setLocalCupos] = useState(3);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const r = () => { setLocalCupos(getCupos()); setReservas(getReservas()); };
    r();
    return onStoreChange(r);
  }, []);

  const saveCupos = () => {
    setCupos(cupos);
    toast.success(`Cupos actualizados: ${cupos}`);
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-2 inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-coral">
          Demo local · sin auth real
        </div>
        <h1 className="font-display text-4xl font-black">Panel admin</h1>
        <p className="mt-2 text-muted-foreground">Gestión visual de cupos y reservas (datos guardados en tu navegador).</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="h-fit p-6">
            <h2 className="font-display text-xl font-black">Cupos disponibles este mes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Se refleja en el hero y carrito en tiempo real.</p>
            <div className="mt-4 flex items-end gap-3">
              <div className="flex-1">
                <Label className="mb-1.5 block">Cupos</Label>
                <Input type="number" min={0} max={50} value={cupos} onChange={(e) => setLocalCupos(Number(e.target.value))} />
              </div>
              <Button onClick={saveCupos} className="bg-gold text-gold-foreground hover:bg-gold/90">Guardar</Button>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h2 className="font-display text-xl font-black">Reservas ({reservas.length})</h2>
            {reservas.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Aún no hay reservas. Genera una desde el flujo de compra.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {reservas.map((r) => (
                  <div key={r.id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-xs text-muted-foreground">{r.id}</div>
                        <div className="font-display text-lg font-bold">{r.checkout.empresa}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.checkout.industria} · {r.checkout.tipoIntegracion} · {r.checkout.objetivo}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{formatCOP(r.anticipo)}</div>
                        <div className="text-xs text-muted-foreground">de {formatCOP(r.total)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">Estado:</span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateReservaStatus(r.id, s)}
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                            r.status === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                          }`}
                        >
                          {s.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                    {r.comprobante && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-xs font-semibold text-primary">Ver comprobante</summary>
                        <img src={r.comprobante} alt="Comprobante" className="mt-2 max-h-48 rounded-md border" />
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
