enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

class Card {
    public readonly rank: number;
    public readonly suit: number; // why number??

    public constructor (rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
    }
}