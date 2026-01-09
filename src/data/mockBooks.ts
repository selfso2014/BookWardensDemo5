import { Book } from '../types/content';

export const MOCK_BOOKS: Book[] = [
    {
        id: 'book_01',
        title: 'The Whispering Woods',
        author: 'Iris Tales',
        description: 'A mysterious forest where trees tell stories of old.',
        coverColor: '#10B981', // Emerald
        level: 1,
        chapters: [
            {
                id: 'ch_01',
                title: 'The Beginning',
                content: [
                    "The library was quiet, save for the gentle rustling of pages. <span class='highlight'>Iris floated silently</span> near the ceiling, her wings shimmering with a soft, iridescent light.",
                    "It was a day unlike any other in Libraria. As the clock struck noon, a strange ripple distorted the air. Books began to tremble on their shelves.",
                    "One by one, letters peeled off the pages, swirling into a chaotic vortex. 'The Rift!' Iris cried out, her small voice trembling with urgency."
                ],
                wordSprint: {
                    id: 'ws_01',
                    word: 'Ephemeral',
                    choices: ['Short-lived', 'Eternal', 'Heavy', 'Bright'],
                    correctChoice: 'Short-lived'
                },
                riftPoints: [
                    { id: 'rp_01', text: 'Corruption...', cleanText: 'Beauty' }
                ],
                boss: {
                    name: 'Trickster of Typos',
                    avatarEmoji: '😈',
                    quizQuestion: 'What was Iris doing?',
                    quizChoices: ['Floating silently', 'Sleeping', 'Eating', 'Dancing'],
                    correctAnswer: 'Floating silently'
                },
                rewards: { ink: 100, runes: 5, gems: 1 }
            },
            {
                id: 'ch_02',
                title: 'Into the Forest',
                content: [
                    "They stepped into the Whispering Woods. The trees here didn't just rustle; they murmured secrets. 'Watch your step, Warden,' Iris warned.",
                    "Roots twisted like sleeping snakes across the path. Every shadow seemed to hide a missing punctuation mark.",
                    "Suddenly, a Sentence Spider dropped from above! It dangled by a thread of run-on sentences."
                ],
                wordSprint: {
                    id: 'ws_02',
                    word: 'Murmur',
                    choices: ['Shout', 'Whisper', 'Silence', 'Cry'],
                    correctChoice: 'Whisper'
                },
                riftPoints: [
                    { id: 'rp_02', text: 'Tangle...', cleanText: 'Path' }
                ],
                boss: {
                    name: 'Sentence Spider',
                    avatarEmoji: '🕷️',
                    quizQuestion: 'What dropped from above?',
                    quizChoices: ['A Rock', 'An Apple', 'Sentence Spider', 'Rain'],
                    correctAnswer: 'Sentence Spider'
                },
                rewards: { ink: 120, runes: 6, gems: 1 }
            }
        ]
    }
];
