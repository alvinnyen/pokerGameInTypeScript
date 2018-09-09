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
    new Card(7, Suit.Diamonds),
    new Card(7, Suit.Clubs),
    new Card(5, Suit.Hearts),
    new Card(12, Suit.Diamonds),
    new Card(12, Suit.Clubs),
]);

// test Hand.isFlush works fine
// console.log(hand1.isFlush());
// console.log(hand2.isFlush());

// test Hand.isStraight works fine
// console.log(hand2.isStraight());

// test Hand.has works fine
// console.log(hand2.has(12, 13, 10));
// console.log(hand2.has(2, 13, 10));

// test Kinds.constructor works fine
hand2.test();


