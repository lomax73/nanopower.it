import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseClient, isSupabaseConfigured, type Tecnico, type AccessLogEntry } from "@/lib/supabase";
import ApproveToggleButton from "@/components/ApproveToggleButton";

export const metadata: Metadata = {
  title: "Admin — Area Tecnici | nanopower.it",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("it-IT", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.ruolo !== "admin") {
    redirect("/area-tecnici");
  }

  let tecnici: Tecnico[] = [];
  let accessLog: (AccessLogEntry & { tecnici: { nome: string; cognome: string } | null })[] = [];

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    const { data: tecniciData } = await supabase
      .from("tecnici")
      .select("*")
      .order("created_at", { ascending: false });
    tecnici = tecniciData || [];

    const { data: logData } = await supabase
      .from("access_log")
      .select("*, tecnici(nome, cognome)")
      .order("created_at", { ascending: false })
      .limit(50);
    accessLog = logData || [];
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white sm:text-3xl">Admin — Area Tecnici</h1>
        <a
          href="/api/admin/export-csv"
          className="border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
        >
          Esporta CSV
        </a>
      </div>

      {!isSupabaseConfigured() && (
        <p className="border border-nano-gold/40 bg-nano-gold/5 p-4 text-sm text-nano-gold">
          Supabase non è ancora configurato: imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY per vedere dati reali.
        </p>
      )}

      <section>
        <h2 className="text-lg font-black text-white">Utenti registrati</h2>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-nano-navy-light">
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Nome</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Azienda</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Email</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Tipo</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Registrato</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Approvato</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {tecnici.map((t, i) => (
                <tr key={t.id} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  <td className="border-b border-white/5 px-4 py-3 text-white">
                    {t.nome} {t.cognome}
                  </td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{t.azienda || "—"}</td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{t.email}</td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{t.tipo_cliente || "—"}</td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{formatDate(t.created_at)}</td>
                  <td className="border-b border-white/5 px-4 py-3">
                    <span className={t.approvato ? "text-nano-teal" : "text-nano-gold"}>
                      {t.approvato ? "Sì" : "In attesa"}
                    </span>
                  </td>
                  <td className="border-b border-white/5 px-4 py-3">
                    <ApproveToggleButton tecnicoId={t.id} approvato={t.approvato} />
                  </td>
                </tr>
              ))}
              {tecnici.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-nano-slate">
                    Nessun utente registrato.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-black text-white">Log accessi (ultimi 50)</h2>
        <div className="mt-4 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-nano-navy-light">
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Utente</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Azione</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Documento</th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Data/ora</th>
              </tr>
            </thead>
            <tbody>
              {accessLog.map((log, i) => (
                <tr key={log.id} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  <td className="border-b border-white/5 px-4 py-3 text-white">
                    {log.tecnici ? `${log.tecnici.nome} ${log.tecnici.cognome}` : "—"}
                  </td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{log.azione}</td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{log.documento || "—"}</td>
                  <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{formatDate(log.created_at)}</td>
                </tr>
              ))}
              {accessLog.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-nano-slate">
                    Nessun accesso registrato.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
