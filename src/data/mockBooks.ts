import type { Book } from '../types/content';
import { createChapter } from './contentHelpers';

export const MOCK_BOOKS: Book[] = [
    // --- Level 1: Beginner (Fables & Fairy Tales) ---
    {
        id: 'alice_wonderland',
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        description: 'A girl falls down a rabbit hole into a fantasy world.',
        coverColor: '#60A5FA', // Blue
        level: 1,
        chapters: [
            createChapter(
                'alice_ch1', 'Down the Rabbit-Hole',
                [
                    "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it. 'And what is the use of a book,' thought Alice 'without pictures or conversation?'",
                    "So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
                    "There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be too late!' (When she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural).",
                    "But when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it.",
                    "Burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge. In another moment down went Alice after it, never once considering how in the world she was to get out again.",
                    "The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.",
                    "Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything.",
                    "Then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled 'ORANGE MARMALADE', but to her great disappointment it was empty.",
                    "She did not like to drop the jar for fear of killing somebody, so managed to put it into one of the cupboards as she fell past it. 'Well!' thought Alice to herself, 'after such a fall as this, I shall think nothing of tumbling down stairs!'",
                    "'How brave they'll all think me at home! Why, I wouldn't say anything about it, even if I fell off the top of the house!' (Which was very likely true.) Down, down, down. Would the fall NEVER come to an end!",
                    "'I wonder how many miles I've fallen by this time?' she said aloud. 'I must be getting somewhere near the centre of the earth. Let me see: that would be four thousand miles down, I think—'",
                    "(For, you see, Alice had learnt several things of this sort in her lessons in the schoolroom, and though this was not a VERY good opportunity for showing off her knowledge, as there was no one to listen to her, still it was good practice to say it over).",
                    "'—Yes, that's about the right distance—but then I wonder what Latitude or Longitude I've got to?' (Alice had no idea what Latitude was, or Longitude either, but thought they were nice grand words to say.)"
                ],
                { word: 'Curiosity', correct: 'Interest', wrongs: ['Boredom', 'Sleep', 'Hunger'] },
                { corrupted: 'R@bb#t H*le', clean: 'Rabbit Hole' },
                { name: 'The White Rabbit', emoji: '🐇', question: 'What did the Rabbit say?', choices: ['Hello!', 'Im late!', 'Goodbye!', 'Hungry!'], answer: 'Im late!' },
                { ink: 100, runes: 5, gems: 0 }
            ),
            createChapter(
                'alice_ch2', 'The Pool of Tears',
                [
                    "'Curiouser and curiouser!' cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English).",
                    "'Now I'm opening out like the largest telescope that ever was! Good-bye, feet!'",
                    "Just then she heard something splashing in the pool a little way off..."
                ],
                { word: 'Telescope', correct: 'Optical Instrument', wrongs: ['Microscope', 'Mirror', 'Window'] },
                { corrupted: 'Tea%s P##l', clean: 'Tears Pool' },
                { name: 'Giant Mouse', emoji: '🐭', question: 'What did Alice forget?', choices: ['Her name', 'How to speak', 'Her way home', 'The time'], answer: 'How to speak' },
                { ink: 120, runes: 6, gems: 1 }
            )
        ]
    },
    {
        id: 'wizard_oz',
        title: 'The Wonderful Wizard of Oz',
        author: 'L. Frank Baum',
        description: 'Dorothy and her dog Toto are swept away to the Land of Oz.',
        coverColor: '#34D399', // Emerald Green
        level: 1,
        chapters: [
            createChapter(
                'oz_ch1', 'The Cyclone',
                [
                    "Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife.",
                    "The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green.",
                    "Suddenly Uncle Henry stood up. 'There's a cyclone coming, Em,' he called to his wife. 'I'll go look after the stock.'"
                ],
                { word: 'Cyclone', correct: 'Storm', wrongs: ['Sunshine', 'Breeze', 'Rain'] },
                { corrupted: 'Gr@y Pr@@rie', clean: 'Gray Prairie' },
                { name: 'Wicked Witch', emoji: '🧙‍♀️', question: 'Where did Dorothy live?', choices: ['New York', 'Kansas', 'Oz', 'Texas'], answer: 'Kansas' },
                { ink: 100, runes: 5, gems: 0 }
            )
        ]
    },
    {
        id: 'aesop_fables',
        title: "Aesop's Fables",
        author: 'Aesop',
        description: 'Timeless short stories with moral lessons.',
        coverColor: '#F59E0B', // Amber
        level: 1,
        chapters: [
            createChapter(
                'aesop_tortoise', 'The Tortoise and the Hare',
                [
                    "The Hare was once boasting of his speed before the other animals. 'I have never yet been beaten,' said he, 'when I put forth my full speed.'",
                    "'I accept your challenge,' said the Tortoise quietly.",
                    "The Hare ran for a while and then stopped to sleep. The Tortoise plodded on and on, and when the Hare awoke... he saw the Tortoise near the goal."
                ],
                { word: 'Boasting', correct: 'Bragging', wrongs: ['Hiding', 'Crying', 'Whispering'] },
                { corrupted: 'Sl@w & St*ady', clean: 'Slow & Steady' },
                { name: 'Sleeping Hare', emoji: '🐰', question: 'Who won the race?', choices: ['The Hare', 'The Tortoise', 'The Fox', 'No one'], answer: 'The Tortoise' },
                { ink: 80, runes: 3, gems: 0 }
            )
        ]
    },

    // --- Level 2: Intermediate (Adventure & Mystery) ---
    {
        id: 'sherlock_holmes',
        title: 'The Adventures of Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        description: 'Master detective Holmes and Dr. Watson solve mysteries.',
        coverColor: '#71717A', // Zinc/Gray
        level: 2,
        chapters: [
            createChapter(
                'holmes_ch1', 'A Scandal in Bohemia',
                [
                    "To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name.",
                    "One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient (for I had now returned to civil practice), when my way led me through Baker Street.",
                    "I saw his tall, spare figure pass twice in a dark silhouette against the blind."
                ],
                { word: 'Silhouette', correct: 'Shadow', wrongs: ['Light', 'Painting', 'Mirror'] },
                { corrupted: 'M$st#ry', clean: 'Mystery' },
                { name: 'Irene Adler', emoji: '🎭', question: 'Who is "THE woman"?', choices: ['Mrs. Hudson', 'Irene Adler', 'Queen Victoria', 'Unknown'], answer: 'Irene Adler' },
                { ink: 150, runes: 10, gems: 1 }
            )
        ]
    },
    {
        id: '20000_leagues',
        title: '20,000 Leagues Under the Seas',
        author: 'Jules Verne',
        description: 'Captain Nemo and his submarine, the Nautilus.',
        coverColor: '#0EA5E9', // Ocean Blue
        level: 2,
        chapters: [
            createChapter(
                'nemo_ch1', 'A Shifting Reef',
                [
                    "The year 1866 was signalised by a remarkable incident, a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten.",
                    "For some time past vessels had been met by 'an enormous thing,' a long object, spindle-shaped, occasionally phosphorescent, and infinitely larger and more rapid in its movements than a whale.",
                    "Measurements validated that it was, indeed, a machine."
                ],
                { word: 'Phenomenon', correct: 'Event', wrongs: ['Person', 'Place', 'Book'] },
                { corrupted: 'Ir#n M@nst*r', clean: 'Iron Monster' },
                { name: 'Giant Squid', emoji: '🦑', question: 'What year was the incident?', choices: ['1866', '1999', '2024', '1700'], answer: '1866' },
                { ink: 160, runes: 12, gems: 2 }
            )
        ]
    },
    {
        id: 'dracula',
        title: 'Dracula',
        author: 'Bram Stoker',
        description: 'A young lawyer travels to a castle in Transylvania.',
        coverColor: '#DC2626', // Red
        level: 2,
        chapters: [
            createChapter(
                'dracula_ch1', 'The Guest',
                [
                    "3 May. Bistritz.—Left Munich at 8:35 P.M., on 1st May, arriving at Vienna early next morning.",
                    "We left in pretty good time, and came after nightfall to Klausenburgh. Here I stopped for the night at the Hotel Royale.",
                    "Count Dracula had directed me to go to the Golden Krone Hotel, which I found, to my great delight, to be thoroughly old-fashioned."
                ],
                { word: 'Delight', correct: 'Joy', wrongs: ['Fear', 'Anger', 'Sadness'] },
                { corrupted: 'V@mp#re K%ss', clean: 'Vampire Kiss' },
                { name: 'Count Dracula', emoji: '🧛', question: 'Where did he arrive first?', choices: ['London', 'Vienna', 'Paris', 'Rome'], answer: 'Vienna' },
                { ink: 180, runes: 15, gems: 2 }
            )
        ]
    },

    // --- Level 3: Advanced (Classics & Literature) ---
    {
        id: 'pride_prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel of manners.',
        coverColor: '#EC4899', // Pink
        level: 3,
        chapters: [
            createChapter(
                'pride_ch1', 'Netherfield Park',
                [
                    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
                    "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families.",
                    "'My dear Mr. Bennet,' said his lady to him one day, 'have you heard that Netherfield Park is let at last?'"
                ],
                { word: 'Acknowledged', correct: 'Admitted', wrongs: ['Denied', 'Hidden', 'Forgotten'] },
                { corrupted: 'M@rr#age Pl#t', clean: 'Marriage Plot' },
                { name: 'Mr. Darcy', emoji: '🎩', question: 'Who must be in want of a wife?', choices: ['A poor man', 'A single man with fortune', 'A soldier', 'A king'], answer: 'A single man with fortune' },
                { ink: 200, runes: 20, gems: 3 }
            )
        ]
    },
    {
        id: 'frankenstein',
        title: 'Frankenstein',
        author: 'Mary Shelley',
        description: 'A scientist creates a sentient creature.',
        coverColor: '#16A34A', // Green
        level: 3,
        chapters: [
            createChapter(
                'frank_ch1', 'The Creation',
                [
                    "It was on a dreary night of November that I beheld the accomplishment of my toils.",
                    "With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.",
                    "It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out."
                ],
                { word: 'Dreary', correct: 'Dull', wrongs: ['Bright', 'Happy', 'Sunny'] },
                { corrupted: 'L#fe Sp@rk', clean: 'Life Spark' },
                { name: 'The Creature', emoji: '🧟', question: 'What month was it?', choices: ['November', 'December', 'July', 'January'], answer: 'November' },
                { ink: 220, runes: 22, gems: 3 }
            )
        ]
    }
];
