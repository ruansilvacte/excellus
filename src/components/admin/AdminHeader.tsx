import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: Props) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-30">
      <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden">
        <Menu className="w-5 h-5" />
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground hidden sm:inline max-w-[250px] truncate">{user?.email}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
