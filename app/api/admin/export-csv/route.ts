import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.ruolo !== "admin") {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 403 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase non configurato." }, { status: 503 });
  }

  const supabase = getSupabaseClient();
  const { data: tecnici } = await supabase
    .from("tecnici")
    .select("nome, cognome, azienda, email, tipo_cliente, created_at")
    .order("created_at", { ascending: false });

  const header = "Nome,Cognome,Azienda,Email,Tipo,Data registrazione";
  const rows = (tecnici || []).map((t) =>
    [t.nome, t.cognome, t.azienda || "", t.email, t.tipo_cliente || "", t.created_at]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );

  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="tecnici-nanopower.csv"`,
    },
  });
}
