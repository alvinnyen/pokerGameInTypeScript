enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

class Card {
    public readonly rank: number;
    public readonly suit: number;

    public constructor (rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
    }

    private static rankNames = [ // why static ??
        'Ace',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King'
    ];

    public get rankName (): string { // ??? 為什麼get空一格???
        return Card.rankNames[this.rank - 1];
    }

    public get suitName (): string { // ??? 為什麼get空一格???
        return Suit[this.suit]; // ???
    }

    public get name (): string { // ??? 為什麼get空一格???
        return `${this.rankName} of ${this.suitName}`;
    }
}