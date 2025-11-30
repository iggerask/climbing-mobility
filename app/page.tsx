import { PROGRAMS } from "@/data/programs";
import Link from "next/link";
import { ArrowRight, Activity, Dumbbell, Mountain, Timer } from "lucide-react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mountain className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">ClimbMobile</h1>
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Mobility Programs</h2>
          <p className="text-slate-600 mt-2">Select a session to start your training.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.values(PROGRAMS).map((program) => (
            <Link
              key={program.id}
              href={`/session/${program.id}`}
              className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                  {program.id.includes("CLIMB") ? <Mountain className="w-6 h-6" /> :
                    program.id.includes("LIFT") ? <Dumbbell className="w-6 h-6" /> :
                      <Activity className="w-6 h-6" />}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {program.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {program.description}
              </p>

              <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
                <Timer className="w-4 h-4 mr-1" />
                {Math.ceil(program.exercises.reduce((acc, ex) => acc + ex.duration, 0) / 60)} mins
                <span className="mx-2">•</span>
                {program.exercises.length} exercises
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
