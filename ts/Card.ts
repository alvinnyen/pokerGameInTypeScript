enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

class Card {
    public readonly rank: number;
    public readonly suit: number; // why number ??

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

    public getRankName (): string {
        return Card.rankNames[this.rank - 1];
    }
}