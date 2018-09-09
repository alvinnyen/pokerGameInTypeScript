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

let hand2 = new Hand([
    new Card(4, Suit.Diamonds),
    new Card(5, Suit.Diamonds),
    new Card(6, Suit.Diamonds),
    new Card(7, Suit.Diamonds),
    new Card(8, Suit.Diamonds),
]);

// console.log(hand1.isFlush());
// console.log(hand2.isFlush());

console.log(hand2.isStraight());

