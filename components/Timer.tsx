"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
    duration: number;
    onComplete?: () => void;
    autoStart?: boolean;
}

export function Timer({ duration, onComplete, autoStart = false }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(autoStart);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTimeLeft(duration);
        setIsActive(autoStart);
        setIsFinished(false);
    }, [duration, autoStart]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        setIsFinished(true);
                        setIsActive(false);
                        if (onComplete) onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, onComplete]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setIsFinished(false);
        setTimeLeft(duration);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = ((duration - timeLeft) / duration) * 100;

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex items-center justify-center w-48 h-48 rounded-full border-4 border-slate-200 bg-white">
                {/* Simple progress ring using conic-gradient */}
                <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                        background: `conic-gradient(var(--tw-text-opacity, 1) 0% ${progress}%, transparent ${progress}% 100%)`
                    }}
                />
                <span className={cn("text-5xl font-bold font-mono", isFinished ? "text-green-600" : "text-slate-900")}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={toggleTimer}
                    className={cn(
                        "flex items-center px-6 py-3 rounded-lg font-medium transition-colors",
                        isActive
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                >
                    {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isActive ? "Pause" : "Start"}
                </button>

                <button
                    onClick={resetTimer}
                    className="p-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Reset"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {isFinished && (
                <div className="flex items-center text-green-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed!
                </div>
            )}
        </div>
    );
}
