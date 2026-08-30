import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getDashboardAccess } from "@/lib/admin-access";
import { TestLab } from "@/components/test-lab";

export default async function TestLabPage() {
  const { authorized } = await getDashboardAccess("/dashboard/teste");

  if (!authorized) {
    return <main className="grid min-h-screen place-items-center bg-[#f6eddd] px-5">
      <section className="max-w-md rounded-3xl border border-[#d9c3a0] bg-white p-7 text-center shadow-xl">
        <ShieldCheck className="mx-auto size-12 text-[#6f2232]" />
        <h1 className="mt-4 font-serif text-3xl font-black">Acesso restrito</h1>
        <p className="mt-3 text-sm leading-6 text-[#71523d]">O laboratório de conteúdo está disponível somente para a conta responsável autorizada.</p>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-[#6f2232]"><ArrowLeft className="size-4" /> Voltar aos estudos</Link>
      </section>
    </main>;
  }

  return <TestLab />;
}
