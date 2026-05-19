import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="text-xs font-semibold text-[var(--color-brand)] uppercase tracking-wider mb-2">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          หน้านี้ไม่มีอยู่
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          The page you’re looking for doesn’t exist on labs.cuvetsmo.com.
        </p>
        <Link href="/" className="btn-brand">
          กลับหน้าแรก
        </Link>
      </main>
      <Footer />
    </>
  );
}
