import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getCart, getCheckout, saveReserva, clearCart, type Reserva } from "@/lib/store";
import { formatCOP } from "@/data/plans";
import { QrCode, Copy, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/checkout/pago")({
  head: () => ({
    meta: [
      { title: "Pago — FrutyStory" },
      { name: "description", content: "Paga tu anticipo con QR Bancolombia o transferencia y sube tu comprobante." },
    ],
  }),
  component: PagoPage,
});

function PagoPage() {
  const nav = useNavigate();
  const [items, setItems] = useState(getCart());
  const [comprobante, setComprobante] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cart = getCart();
    const co = getCheckout();
    if (cart.length === 0 || !co) {
      toast.error("Falta información");
      nav({ to: "/carrito" });
      return;
    }
    setItems(cart);
  }, [nav]);

  const total = items.reduce((s, i) => s + i.price, 0);
  const anticipo = Math.round(total * 0.3);

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`${label} copiado`);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { toast.error("Máximo 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setComprobante(reader.result as string);
    reader.readAsDataURL(f);
  };

  const confirm = () => {
    const co = getCheckout();
    if (!co) return;
    const reserva: Reserva = {
      id: `FS-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items,
      total,
      anticipo,
      checkout: co,
      comprobante,
      status: comprobante ? "pago_subido" : "pendiente",
    };
    saveReserva(reserva);
    clearCart();
    sessionStorage.setItem("fs_last_reserva", reserva.id);
    nav({ to: "/checkout/confirmacion" });
  };

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-display text-4xl font-black">Pago del anticipo</h1>
        <p className="mt-2 text-muted-foreground">
          Anticipo a pagar: <span className="font-bold text-primary">{formatCOP(anticipo)}</span> (30% de {formatCOP(total)})
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <Tabs defaultValue="qr">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr">QR Bancolombia</TabsTrigger>
                <TabsTrigger value="llave">Llave / Transferencia</TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="mt-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-white p-4 ring-2 ring-gold">
                    <QrCode className="h-full w-full text-primary" strokeWidth={0.6} />
                  </div>
                  <p className="text-sm text-muted-foreground">Escanea con la app de Bancolombia y paga {formatCOP(anticipo)}.</p>
                </div>
              </TabsContent>
              <TabsContent value="llave" className="mt-6 space-y-3">
                {[
                  { l: "Llave Bre-B", v: "@frutystory" },
                  { l: "Banco", v: "Bancolombia" },
                  { l: "Tipo de cuenta", v: "Ahorros" },
                  { l: "Número", v: "123-456789-00" },
                  { l: "Titular", v: "FrutyStory SAS" },
                  { l: "NIT", v: "900.000.000-1" },
                ].map((row) => (
                  <div key={row.l} className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">{row.l}</div>
                      <div className="font-semibold">{row.v}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copy(row.v, row.l)}>
                      <Copy />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-7 border-t pt-6">
              <h3 className="font-display text-lg font-bold">Sube tu comprobante</h3>
              <p className="text-sm text-muted-foreground">Imagen o pantallazo del pago (máx. 5MB).</p>
              <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                <Button variant="outline" onClick={() => fileRef.current?.click()}>
                  <Upload /> Seleccionar archivo
                </Button>
                {comprobante && (
                  <div className="flex items-center gap-2 text-sm text-gold">
                    <Check /> Comprobante cargado
                  </div>
                )}
              </div>
              {comprobante && (
                <img src={comprobante} alt="Comprobante" className="mt-4 max-h-56 rounded-lg border" />
              )}
            </div>
          </Card>

          <Card className="h-fit p-6">
            <h2 className="font-display text-xl font-black">Resumen</h2>
            <div className="mt-4 space-y-2 text-sm">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>Plan {it.name}</span>
                  <span>{formatCOP(it.price)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
                <span>Total</span><span>{formatCOP(total)}</span>
              </div>
              <div className="flex justify-between font-bold text-primary">
                <span>Anticipo</span><span>{formatCOP(anticipo)}</span>
              </div>
            </div>
            <Button onClick={confirm} className="mt-5 w-full bg-gold text-gold-foreground hover:bg-gold/90">
              Marcar como pagado
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Aprobaremos tu reserva manualmente en menos de 24h.
            </p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
