import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

export default function QuoteModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent("Nova solicitação de orçamento — New Creation Home Solutions");
    const body = encodeURIComponent(
      `Nome: ${data.get("nome")}\nTelefone: ${data.get("telefone")}\nEmail: ${data.get("email")}\nEndereço: ${data.get(
        "endereco",
      )}\nCidade/Estado: ${data.get("cidade")}\nServiço desejado: ${data.get("servico")}\n\nObservações:\n${data.get("obs") || ""}`,
    );
    // Open user's email client as a fallback delivery
    window.location.href = `mailto:bean@newcreationhomesolutions.com?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(() => setSent(false), 300);
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-primary mb-2">Obrigado!</h3>
            <p className="text-muted-foreground">
              Recebemos sua solicitação e entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl text-primary">
                Solicite um Orçamento Gratuito
              </DialogTitle>
              <DialogDescription>
                Preencha os dados e nossa equipe entrará em contato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="telefone" required className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço do Projeto</Label>
                <Input id="endereco" name="endereco" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade / Estado</Label>
                <Input id="cidade" name="cidade" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="servico">Tipo de serviço desejado</Label>
                <Input
                  id="servico"
                  name="servico"
                  placeholder="Ex: Piso de madeira, cerâmica, lixamento..."
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="obs">Observações (opcional)</Label>
                <Textarea id="obs" name="obs" rows={3} className="mt-1.5" />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 font-semibold"
              >
                Enviar Solicitação
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
