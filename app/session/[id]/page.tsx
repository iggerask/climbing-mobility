"use client";

import { useState } from "react";
import { PROGRAMS } from "@/data/programs";
import { Timer } from "@/components/Timer";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ArrowLeft, CheckCircle, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWakeLock } from "@/hooks/useWakeLock";

export default function SessionPage() {
    const params = useParams();
    const id = params.id as string;
    const program = PROGRAMS[id];

    useWakeLock(); // Keep screen on

    const [status, setStatus] = useState<"intro" | "active" | "finished">("intro");
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    if (!program) {
        return notFound();
    }

    const currentExercise = program.exercises[currentExerciseIndex];
    const isLastExercise = currentExerciseIndex === program.exercises.length - 1;

    const startSession = () => {
        setStatus("active");
        setIsTimerRunning(true);
    };

    const nextExercise = async () => {
        if (isLastExercise) {
            setStatus("finished");
            try {
                await fetch("/api/history", {
                    method: "POST",
                    body: JSON.stringify({
                        sessionId: program.id,
                        duration: program.exercises.reduce((acc, ex) => acc + ex.duration, 0)
                    }),
                });
            } catch (error) {
                console.error("Failed to save session", error);
            }
        } else {
            setCurrentExerciseIndex((prev) => prev + 1);
            setIsTimerRunning(true); // Auto-start next timer? Maybe optional.
        }
    };

    const handleTimerComplete = () => {
        // Optional: Auto-advance or play sound
        // For now, just stop timer and let user click next
        setIsTimerRunning(false);
    };

    if (status === "intro") {
        return (
            <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">{program.title}</h1>
                    <p className="text-slate-600 mb-8">{program.description}</p>

                    <div className="space-y-4 text-left mb-8 bg-slate-50 p-4 rounded-lg">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Duration</span>
                            <span className="font-medium text-slate-900">
                                {Math.ceil(program.exercises.reduce((acc, ex) => acc + ex.duration, 0) / 60)} mins
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Exercises</span>
                            <span className="font-medium text-slate-900">{program.exercises.length}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={startSession}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Start Session
                        </button>
                        <Link
                            href="/"
                            className="block w-full py-3 px-4 text-slate-500 hover:bg-slate-50 font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (status === "finished") {
        return (
            <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Session Complete!</h1>
                    <p className="text-slate-600 mb-8">Great job working on your mobility.</p>

                    <Link
                        href="/"
                        className="block w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => setStatus("intro")} className="text-slate-500 hover:text-slate-900">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="font-semibold text-slate-900">
                    Exercise {currentExerciseIndex + 1} of {program.exercises.length}
                </div>
                <div className="w-6" /> {/* Spacer */}
            </header>

            <div className="flex-1 max-w-md mx-auto w-full p-4 flex flex-col space-y-6 pb-24">
                <ExerciseCard exercise={currentExercise} isActive={true} />

                <div className="flex-1 flex items-center justify-center">
                    <Timer
                        key={currentExercise.id} // Reset timer on exercise change
                        duration={currentExercise.duration}
                        onComplete={handleTimerComplete}
                        autoStart={true}
                    />
                </div>
            </div>

            {/* Sticky Bottom Controls */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 safe-area-bottom">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={nextExercise}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center"
                    >
                        {isLastExercise ? "Finish Session" : "Next Exercise"}
                        <ChevronRight className="w-6 h-6 ml-2" />
                    </button>
                </div>
            </div>
        </main>
    );
}
}
