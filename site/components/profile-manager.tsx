"use client";

import { useEffect, useState } from "react";
import { Copy, Eye, Link2, Plus, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Profile = { id: string; name: string; school_year: string | null };

export function ProfileManager({ selectedId }: { selectedId: string }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [pairing, setPairing] = useState<{ id: string; code: string } | null>(null);

  async function load() { const response = await fetch("/api/profiles"); if (response.ok) setProfiles((await response.json()).profiles); }
  // The profile list is external server state and is loaded once on mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);
  async function create() {
    const response = await fetch("/api/profiles", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, schoolYear }) });
    if (response.ok) { setName(""); setSchoolYear(""); setCreating(false); await load(); }
  }
  async function pair(id: string) {
    const response = await fetch(`/api/profiles/${encodeURIComponent(id)}/pair`, { method: "POST" });
    if (response.ok) setPairing({ id, code: (await response.json()).code });
  }
  return <section className="mb-7 rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-4 sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#846047]">Perfis da família</p><h2 className="font-serif text-2xl font-black">Escolha quem acompanhar</h2></div><Button onClick={() => setCreating(!creating)} variant="outline" className="rounded-xl"><Plus className="mr-2 size-4" />Criar perfil</Button></div>
    {creating && <div className="mt-4 grid gap-3 rounded-2xl bg-[#f4e8d4] p-4 sm:grid-cols-[1fr_1fr_auto]"><Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da criança" /><Input value={schoolYear} onChange={e => setSchoolYear(e.target.value)} placeholder="Ano escolar (opcional)" /><Button onClick={create} disabled={name.trim().length < 2}>Salvar</Button></div>}
    <div className="mt-4 grid gap-3 md:grid-cols-2">{profiles.map(profile => <article key={profile.id} className={`rounded-2xl border p-4 ${selectedId === profile.id ? "border-[#6f2232] bg-[#f8ead2]" : "border-[#dfccb0]"}`}><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#6f2232] text-white"><UserRound className="size-5" /></span><div className="min-w-0 flex-1"><b>{profile.name}</b><p className="text-xs text-[#765741]">{profile.school_year ?? "Ano não informado"}</p></div></div><div className="mt-3 flex flex-wrap gap-2"><a href={`/dashboard?student=${encodeURIComponent(profile.id)}`} className="rounded-xl bg-[#6f2232] px-3 py-2 text-xs font-black text-white">Acompanhar</a><a href={`/dashboard/perfil/${encodeURIComponent(profile.id)}`} className="rounded-xl border border-[#cfae7a] px-3 py-2 text-xs font-black text-[#6f2232]"><Eye className="mr-1 inline size-3" />Ver como criança</a><button onClick={() => pair(profile.id)} className="rounded-xl border border-[#cfae7a] px-3 py-2 text-xs font-black text-[#6f2232]"><Link2 className="mr-1 inline size-3" />Vincular aparelho</button></div>{pairing?.id === profile.id && <div className="mt-3 rounded-xl bg-white p-3 text-center"><p className="text-xs">Código válido por 10 minutos</p><button onClick={() => navigator.clipboard.writeText(pairing.code)} className="mt-1 text-2xl font-black tracking-[.25em] text-[#6f2232]">{pairing.code}<Copy className="ml-2 inline size-4" /></button></div>}</article>)}</div>
  </section>;
}
