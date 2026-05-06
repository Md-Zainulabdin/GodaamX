import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-black selection:text-white">
      {/* Main Container */}
      <div className="mx-auto max-w-7xl overflow-hidden border border-white bg-white">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight">GodaamX</span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-500 md:flex">
            <Link href="#" className="hover:text-black transition-colors">Home</Link>
            <Link href="#" className="hover:text-black transition-colors">Features</Link>
            <Link href="#" className="hover:text-black transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-black transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex text-zinc-600">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full bg-black px-6 text-white hover:bg-zinc-800">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="flex flex-col items-center px-6 pt-16 pb-24 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center bg-zinc-100 rounded-full px-3 py-2 text-xs font-medium text-zinc-600 ">
            <span className="mr-2 rounded-full bg-white px-2 py-0.5 font-bold text-black shadow-sm">New</span>
            Advanced AI Inventory Insights
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight leading-[1.12] sm:text-6xl md:text-7xl">
            Smart ERP System, <br />
            <span className="text-zinc-400 font-medium tracking-tight">Powered By GodaamX</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-500 sm:text-xl">
            Track Inventory, Revenue, Expenses andGrowth in real-time. <br className="hidden sm:block" />
            Let GodaamX turn your supply chain data into clear, actionable decisions.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild className="h-12 rounded-xl px-8 bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/10">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl border-zinc-200 px-8 hover:bg-zinc-50 text-zinc-600">
              View Demo
            </Button>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Trusted by leading logistics providers</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
              <span className="text-xl font-bold tracking-tighter">NEXALOG</span>
              <span className="text-xl font-bold tracking-tighter">SHIPPORT</span>
              <span className="text-xl font-bold tracking-tighter">METRICLY</span>
              <span className="text-xl font-bold tracking-tighter">FLUXFLOW</span>
              <span className="text-xl font-bold tracking-tighter">G-LOGICS</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mt-24 w-full max-w-5xl px-4">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl transition-all duration-500 hover:border-zinc-300">
              <img
                src="/dashboard.png"
                alt="GodaamX Dashboard Preview"
                className="w-full rounded-xl"
              />
            </div>

            {/* Decorative background elements */}
            <div className="absolute -bottom-12 -left-12 -z-10 size-64 rounded-full bg-zinc-100 blur-3xl" />
            <div className="absolute -top-12 -right-12 -z-10 size-64 rounded-full bg-zinc-50 blur-3xl" />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-zinc-400">
        <p>&copy; {new Date().getFullYear()} GodaamX — Inventory & Logistic ERP System.</p>
      </footer>
    </div>
  );
}
