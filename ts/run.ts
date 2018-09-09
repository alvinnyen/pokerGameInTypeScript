// let c = new Card(1, Suit.Diamonds);
// console.log(c.name);

// console.log();

// let d = new Deck();
// d.shuffle();
// console.log(d.draw().name);

// let hand1 = new Hand([
//     new Card(10, Suit.Diamonds),
//     new Card(11, Suit.Hearts),
//     new Card(12, Suit.Diamonds),
//     new Card(13, Suit.Diamonds),
//     new Card(1, Suit.Diamonds),
// ]);

// let hand2 = new Hand([
//     new Card(7, Suit.Diamonds),
//     new Card(7, Suit.Clubs),
//     new Card(5, Suit.Hearts),
//     new Card(12, Suit.Diamonds),
//     new Card(12, Suit.Clubs),
// ]);

// test Hand.isFlush works fine
// console.log(hand1.isFlush());
// console.log(hand2.isFlush());

// test Hand.isStraight works fine
// console.log(hand2.isStraight());

// test Hand.has works fine
// console.log(hand2.has(12, 13, 10));
// console.log(hand2.has(2, 13, 10));

// test Kinds.constructor works fine
// hand2.test();

let hands = [
    // Royal flush
    new Hand([
        new Card(10, Suit.Clubs),
        new Card(11, Suit.Clubs),
        new Card(12, Suit.Clubs),
        new Card(13, Suit.Clubs),
        new Card(1, Suit.Clubs),
    ]),
    // Straight flush
    new Hand([
        new Card(4, Suit.Clubs),
        new Card(5, Suit.Clubs),
        new Card(6, Suit.Clubs),
        new Card(7, Suit.Clubs),
        new Card(8, Suit.Clubs),
    ]),
    // Four of a kind
    new Hand([
        new Card(10, Suit.Diamonds),
        new Card(10, Suit.Clubs),
        new Card(10, Suit.Spades),
        new Card(10, Suit.Hearts),
        new Card(1, Suit.Clubs),
    ]),
    // Full house
    new Hand([
        new Card(6, Suit.Clubs),
        new Card(6, Suit.Spades),
        new Card(6, Suit.Diamonds),
        new Card(13, Suit.Clubs),
        new Card(13, Suit.Hearts),
    ]),
    // Flush
    new Hand([
        new Card(10, Suit.Hearts),
        new Card(13, Suit.Hearts),
        new Card(4, Suit.Hearts),
        new Card(3, Suit.Hearts),
        new Card(1, Suit.Hearts),
    ]),
    // Straight
    new Hand([
        new Card(6, Suit.Clubs),
        new Card(7, Suit.Hearts),
        new Card(10, Suit.Spades),
        new Card(8, Suit.Diamonds),
        new Card(9, Suit.Diamonds),
    ]),
    // Three of a kind
    new Hand([
        new Card(10, Suit.Spades),
        new Card(4, Suit.Clubs),
        new Card(10, Suit.Diamonds),
        new Card(7, Suit.Clubs),
        new Card(10, Suit.Clubs),
    ]),
    // Two pair
    new Hand([
        new Card(5, Suit.Diamonds),
        new Card(5, Suit.Spades),
        new Card(12, Suit.Diamonds),
        new Card(2, Suit.Diamonds),
        new Card(2, Suit.Clubs),
    ]),
    // Jacks or better
    new Hand([
        new Card(11, Suit.Spades),
        new Card(11, Suit.Diamonds),
        new Card(2, Suit.Diamonds),
        new Card(3, Suit.Clubs),
        new Card(1, Suit.Spades),
    ]),
    // Nothing
    new Hand([
        new Card(5, Suit.Diamonds),
        new Card(11, Suit.Diamonds),
        new Card(12, Suit.Hearts),
        new Card(8, Suit.Hearts),
        new Card(1, Suit.Clubs),
    ]),
];

hands.forEach(h => {
    const s = h.getScore();
    console.log(s);
    console.log(s.handRank.name, s.handRank.payout, ',', s.scoringCards.map(c => c.name).join(', '));
    console.log(' ');
});



