import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";
import { authOptions } from "@/lib/auth";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const DOCS_DIR = path.join(process.cwd(), "private/documents");

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

export async function GET(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Non autenticato." }, { status: 401 });
  }

  if (!session.user.approvato) {
    return NextResponse.json({ error: "Accesso non ancora approvato." }, { status: 403 });
  }

  const { filename } = await params;

  // Evita path traversal: consente solo nomi file semplici, nessun separatore di percorso.
  if (filename.includes("/") || filename.includes("..")) {
    return NextResponse.json({ error: "Nome file non valido." }, { status: 400 });
  }

  const filePath = path.join(DOCS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Documento non trovato." }, { status: 404 });
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    await supabase.from("access_log").insert({
      tecnico_id: session.user.id,
      azione: "download",
      documento: filename,
    });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase();

  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
