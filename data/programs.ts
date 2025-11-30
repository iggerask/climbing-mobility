export type Exercise = {
    id: string;
    title: string;
    description: string;
    duration: number; // in seconds
    reps?: string;
    image?: string; // placeholder for now
};

export type Program = {
    id: string;
    title: string;
    description: string;
    exercises: Exercise[];
};

export const PROGRAMS: Record<string, Program> = {
    PRE_CLIMB: {
        id: "PRE_CLIMB",
        title: "Pre-Climb Dynamic Warm-Up",
        description: "Activate muscles and mobilize joints before bouldering.",
        exercises: [
            {
                id: "arm-circles",
                title: "Arm Circles",
                description: "Start small, gradually increase size. Forward and backward.",
                duration: 30,
                reps: "15 each way"
            },
            {
                id: "leg-swings",
                title: "Leg Swings",
                description: "Forward/backward and side-to-side swings to open hips.",
                duration: 60,
                reps: "10 each leg/direction"
            },
            {
                id: "scapular-pullups",
                title: "Scapular Pull-ups",
                description: "Hang from bar, engage shoulders down and back without bending elbows.",
                duration: 45,
                reps: "10 reps"
            },
            {
                id: "squat-to-stand",
                title: "Squat to Stand",
                description: "Deep squat, hold toes, extend legs to stretch hamstrings.",
                duration: 60,
                reps: "10 reps"
            }
        ]
    },
    POST_CLIMB: {
        id: "POST_CLIMB",
        title: "Post-Climb Cool-Down",
        description: "Static stretching to aid recovery and maintain range of motion.",
        exercises: [
            {
                id: "forearm-stretch",
                title: "Forearm Flexor Stretch",
                description: "Gently pull fingers back with palm facing out.",
                duration: 60,
                reps: "30s each arm"
            },
            {
                id: "chest-opener",
                title: "Doorway Chest Stretch",
                description: "Place forearm on doorframe, lean forward to stretch pec.",
                duration: 60,
                reps: "30s each side"
            },
            {
                id: "childs-pose",
                title: "Child's Pose",
                description: "Kneel, sit back on heels, reach arms forward.",
                duration: 60
            }
        ]
    },
    PRE_LIFT: {
        id: "PRE_LIFT",
        title: "Pre-Weightlifting Mobility",
        description: "Prepare for heavy loading with specific joint mobilization.",
        exercises: [
            {
                id: "thoracic-rotation",
                title: "Thoracic Rotations",
                description: "Quadruped position, hand behind head, rotate elbow to sky.",
                duration: 60,
                reps: "10 each side"
            },
            {
                id: "hip-90-90",
                title: "90/90 Hip Switches",
                description: "Sit with legs in 90/90, switch knees side to side.",
                duration: 60,
                reps: "10 reps"
            }
        ]
    },
    DEEP_STRETCH: {
        id: "DEEP_STRETCH",
        title: "Weekly Deep Mobility",
        description: "Intense 30-minute session to increase maximum range of motion.",
        exercises: [
            {
                id: "frog-stretch",
                title: "Frog Stretch",
                description: "Knees wide, feet together or out, push hips back.",
                duration: 120
            },
            {
                id: "pigeon-pose",
                title: "Pigeon Pose",
                description: "One leg forward bent, other straight back. Deep hip opener.",
                duration: 180,
                reps: "90s each side"
            },
            {
                id: "couch-stretch",
                title: "Couch Stretch",
                description: "Shin against wall/box, hip extension. Intense quad/hip flexor stretch.",
                duration: 180,
                reps: "90s each side"
            }
        ]
    }
};
