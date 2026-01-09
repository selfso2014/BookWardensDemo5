export interface WordQuiz {
    id: string;
    word: string;
    choices: string[];
    correctChoice: string; // The correct answer string
}

export interface RiftPoint {
    id: string;
    text: string; // The corrupted text shown
    cleanText: string; // Text after cleansing (optional)
}

export interface BossContent {
    name: string;
    avatarEmoji: string;
    quizQuestion: string;
    quizChoices: string[]; // usually 1 correct answer logic handled by phase
    correctAnswer: string;
}

export interface Chapter {
    id: string;
    title: string;
    content: string[]; // Array of paragraphs. HTML safe string allowed for highlights.
    wordSprint: WordQuiz;
    riftPoints: RiftPoint[];
    boss: BossContent;
    rewards: {
        ink: number;
        runes: number;
        gems: number;
    }
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    coverColor: string; // hex or tailwind class
    level: number;
    chapters: Chapter[];
}
