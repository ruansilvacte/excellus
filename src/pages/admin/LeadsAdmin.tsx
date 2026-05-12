import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Search, Trash2, Loader2, Download, Mail, Phone, MapPin, Calendar } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  notes: string | null;
  created_at: string;
}

export default function LeadsAdmin() {
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const { data: leads = [], isLoading, refetch } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.zip_code.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting lead.");
    } else {
      toast.success("Lead deleted.");
      refetch();
    }
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Zip Code", "Notes", "Date"].join(","),
      ...filtered.map((l) =>
        [
          `"${l.name}"`,
          `"${l.email}"`,
          `"${l.phone}"`,
          `"${l.zip_code}"`,
          `"${(l.notes || "").replace(/"/g, "'")}"`,
          `"${format(new Date(l.created_at), "yyyy-MM-dd HH:mm")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1
            className="text-xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}
          >
            Leads
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} captured
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport} disabled={filtered.length === 0}>
          <Download className="w-4 h-4 mr-1.5" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email or zip..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-8 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm py-12">
          {search ? "No leads found matching your search." : "No leads yet. Leads from the website form will appear here."}
        </div>
      ) : isMobile ? (
        /* Mobile: Card layout */
        <div className="space-y-2">
          {filtered.map((lead) => (
            <div key={lead.id} className="bg-card rounded-xl border border-border p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm">{lead.name}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete lead?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove <strong>{lead.name}</strong> from your leads list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(lead.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 shrink-0" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{lead.zip_code}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Calendar className="w-3 h-3" />
                    <span>{format(new Date(lead.created_at), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Table layout */
        <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="pb-0 px-6 pt-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              Captured Leads
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Phone</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Zip</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.zip_code}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(lead.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="px-4 py-3">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete lead?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove <strong>{lead.name}</strong> ({lead.email}) from your leads list.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(lead.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
