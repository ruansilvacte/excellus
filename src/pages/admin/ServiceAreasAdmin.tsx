import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useServiceAreas, useCreateServiceArea, useUpdateServiceArea, useDeleteServiceArea } from "@/hooks/useServiceAreas";
import { Loader2, Plus, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ServiceAreasAdmin() {
  const { data: areas, isLoading } = useServiceAreas();
  const create = useCreateServiceArea();
  const update = useUpdateServiceArea();
  const del = useDeleteServiceArea();
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newRegion, setNewRegion] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return toast.error("Nome é obrigatório");
    create.mutate(
      { name: newName.trim(), city: newCity.trim(), region: newRegion.trim(), sort_order: (areas?.length || 0) + 1, active: true },
      {
        onSuccess: () => { setNewName(""); setNewCity(""); setNewRegion(""); toast.success("Área adicionada!"); },
        onError: () => toast.error("Erro ao adicionar"),
      }
    );
  };

  const handleDelete = (id: string) => {
    del.mutate(id, {
      onSuccess: () => toast.success("Área removida!"),
      onError: () => toast.error("Erro ao remover"),
    });
  };

  const toggleActive = (id: string, active: boolean) => {
    update.mutate({ id, active: !active });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
          Áreas Atendidas
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Gerencie cidades e bairros que aparecem no site</p>
      </div>

      {/* Add new */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-accent" /> Adicionar nova área
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input placeholder="Nome (ex: Framingham)" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="Cidade" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
            <Input placeholder="Região (ex: MetroWest)" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} />
          </div>
          <Button onClick={handleAdd} disabled={create.isPending} className="mt-3 gap-2">
            {create.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Adicionar
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" /> Áreas ({areas?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
            </div>
          ) : (
            <div className="space-y-2">
              {areas?.map((area) => (
                <div key={area.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/40">
                  <div className="flex items-center gap-3">
                    <Switch checked={area.active} onCheckedChange={() => toggleActive(area.id, area.active)} />
                    <div>
                      <span className="text-sm font-medium">{area.name}</span>
                      {area.region && <span className="text-xs text-muted-foreground ml-2">({area.region})</span>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(area.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
