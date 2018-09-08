let c = new Card(1, Suit.Diamonds);
console.log(c.name);

console.log();

let d = new Deck();
d.shuffle();
console.log(d.draw().name);