"use client";

import { useEffect, useState } from "react";
import { BookOpen, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudyHome } from "@/components/study-home";

const TOKEN_KEY = "estudos-criancas-device-token-v1";
type Profile = { id: string; name: string; schoolYear: string | null; avatar: string };

export function StudentGate() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!token) { setLoading(false); return; }
    fetch("/api/me", { headers: { authorization: `Bearer ${token}` } })
      .then(async (response) => response.ok ? (await response.json()).profile : null)
      .then((value) => { if (value) setProfile(value); else localStorage.removeItem(TOKEN_KEY); })
      .finally(() => setLoading(false));
  }, []);

  async function pair() {
    setError(""); setLoading(true);
    const response = await fetch("/api/pair", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    const data = await response.json() as { token?: string; profile?: Profile; error?: string };
    if (response.ok && data.token && data.profile) { localStorage.setItem(TOKEN_KEY, data.token); setProfile(data.profile); }
    else setError(data.error ?? "Não foi possível vincular este aparelho.");
    setLoading(false);
  }

  if (profile) return <StudyHome profile={profile} />;
  return <main className="grid min-h-screen place-items-center bg-[#f7edda] px-5"><section className="w-full max-w-md rounded-[2rem] border border-[#d6bd93] bg-[#fffdf7] p-7 text-center shadow-xl">
    <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#6f2232] text-white"><BookOpen className="size-8" /></span>
    <p className="eyebrow mt-5">Espaço de estudos</p><h1 className="mt-2 font-serif text-3xl font-black">Vincular este aparelho</h1>
    <p className="mt-3 text-sm leading-6 text-[#71523d]">Peça ao responsável o código temporário de 6 números exibido no dashboard.</p>
    <Input inputMode="numeric" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" className="mt-6 h-14 rounded-2xl text-center text-2xl font-black tracking-[.3em]" />
    {error && <p className="mt-3 text-sm font-bold text-red-700">{error}</p>}
    <Button disabled={loading || code.length !== 6} onClick={pair} className="mt-5 h-12 w-full rounded-2xl bg-[#6f2232] font-bold text-white"><Link2 className="mr-2 size-5" />{loading ? "Verificando…" : "Entrar no meu perfil"}</Button>
    <a href="/dashboard" className="mt-5 inline-block text-xs font-bold text-[#6f2232]">Área do responsável</a>
  </section></main>;
}
