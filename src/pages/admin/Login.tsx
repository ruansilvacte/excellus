import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, loading: authLoading, signIn, checkAdmin, signOut } = useAuth();
  const { toast } = useToast();

  // If already logged in as admin, redirect immediately
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      window.location.replace("/admin");
    }
  }, [authLoading, user, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: Sign in
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Login falhou", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Step 2: Get user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      toast({ title: "Erro", description: userError?.message || "Não foi possível obter dados do usuário.", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Step 3: Update global state
    await checkAdmin(userData.user.id);

    // Step 4: Check admin via RPC
    const { data: isAdminResult, error: rpcError } = await supabase.rpc("is_admin", { _user_id: userData.user.id });

    if (rpcError) {
      console.error("RPC error:", rpcError);
      toast({ title: "Erro ao verificar permissões", description: rpcError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (isAdminResult) {
      window.location.replace("/admin");
      return;
    } else {
      await signOut();
      toast({ title: "Acesso negado", description: "Você não tem permissão de administrador.", variant: "destructive" });
      setLoading(false);
    }
  };

  // Show nothing while checking if already authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--gradient-gold)" }}
    >
      <motion.div
        className="w-full max-w-md bg-card rounded-3xl shadow-2xl p-8 md:p-10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="All Shine Up" className="h-16 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 rounded-xl h-11"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 rounded-xl h-11"
              required
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl text-base font-semibold"
            style={{ background: "var(--gradient-gold)" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
