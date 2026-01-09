import type { Chapter } from '../types/content';

// Helper to generate a standardized chapter
export const createChapter = (
    id: string,
    title: string,
    paragraphs: string[],
    wordSprint: { word: string, correct: string, wrongs: string[] },
    riftText: { corrupted: string, clean: string },
    boss: { name: string, emoji: string, question: string, choices: string[], answer: string },
    rewards: { ink: number, runes: number, gems: number }
): Chapter => {
    return {
        id,
        title,
        content: paragraphs,
        wordSprint: {
            id: `ws_${id}`,
            word: wordSprint.word,
            choices: shuffle([...wordSprint.wrongs, wordSprint.correct]),
            correctChoice: wordSprint.correct
        },
        riftPoints: [
            { id: `rp_${id}`, text: riftText.corrupted, cleanText: riftText.clean }
        ],
        boss: {
            name: boss.name,
            avatarEmoji: boss.emoji,
            quizQuestion: boss.question,
            quizChoices: boss.choices,
            correctAnswer: boss.answer
        },
        rewards
    };
};

function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
}
