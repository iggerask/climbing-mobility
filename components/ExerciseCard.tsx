import { Exercise } from "@/data/programs";
import { Clock, Repeat } from "lucide-react";

interface ExerciseCardProps {
    exercise: Exercise;
    isActive?: boolean;
}

export function ExerciseCard({ exercise, isActive = false }: ExerciseCardProps) {
    return (
        <div className={`p-4 rounded-lg border transition-all ${isActive ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500' : 'border-slate-200 bg-white'}`}>
            <h3 className="text-lg font-semibold text-slate-900">{exercise.title}</h3>
            <p className="text-slate-600 mt-1 text-sm">{exercise.description}</p>

            <div className="flex items-center space-x-4 mt-3 text-sm text-slate-500">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {exercise.duration}s
                </div>
                {exercise.reps && (
                    <div className="flex items-center">
                        <Repeat className="w-4 h-4 mr-1" />
                        {exercise.reps}
                    </div>
                )}
            </div>
        </div>
    );
}
