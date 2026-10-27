// Blind box data - Customize the names, descriptions, and contents!
// All boxes appear mysterious until clicked. She discovers what's inside only after selecting!
export interface BlindBox {
    id: number;
    name: string;
    emoji: string;
    description: string;
    color: string;
    mysteryLabel: string;
}

export const blindBoxes: BlindBox[] = [
    {
        id: 1,
        name: "Box of Kisses",
        emoji: "💋",
        description: "A thousand kisses saved just for you",
        color: "from-pink-400 to-rose-500",
        mysteryLabel: "Mystery Box #1",
    },
    {
        id: 2,
        name: "Future Plans",
        emoji: "🌟",
        description: "Our dreams and adventures yet to come",
        color: "from-amber-400 to-orange-500",
        mysteryLabel: "Mystery Box #2",
    },
    {
        id: 3,
        name: "Secret Promises",
        emoji: "🤫",
        description: "Whispered promises only we know",
        color: "from-purple-400 to-violet-500",
        mysteryLabel: "Mystery Box #3",
    },
    {
        id: 4,
        name: "Warm Hugs",
        emoji: "🤗",
        description: "The warmest hugs to brighten your day",
        color: "from-love-500 to-love-600",
        mysteryLabel: "Mystery Box #4",
    },
    {
        id: 5,
        name: "Love Letters",
        emoji: "💌",
        description: "Unspoken words written from my heart",
        color: "from-red-400 to-pink-500",
        mysteryLabel: "Mystery Box #5",
    },
];
