var Suit;
(function (Suit) {
    Suit[Suit["Spades"] = 0] = "Spades";
    Suit[Suit["Clubs"] = 1] = "Clubs";
    Suit[Suit["Hearts"] = 2] = "Hearts";
    Suit[Suit["Diamonds"] = 3] = "Diamonds";
})(Suit || (Suit = {}));
var Card = /** @class */ (function () {
    function Card(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    Object.defineProperty(Card.prototype, "rankName", {
        get: function () {
            return Card.rankNames[this.rank - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suitName", {
        get: function () {
            return Suit[this.suit]; // ???
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "name", {
        get: function () {
            return this.rankName + " of " + this.suitName;
        },
        enumerable: true,
        configurable: true
    });
    Card.rankNames = [
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
    return Card;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        for (var s = 0; s < 4; s++) {
            for (var r = 1; r <= 13; r++) {
                this.cards.push(new Card(r, s));
            }
        }
    }
    Deck.prototype.shuffle = function () {
        this.cards.sort(function () { return Math.floor(Math.random() * 3 - 1); }); // ??? check the result of random
    };
    Deck.prototype.draw = function () {
        return this.cards.shift();
    };
    return Deck;
}());
var c = new Card(1, Suit.Diamonds);
console.log(c.name);
console.log();
var d = new Deck();
d.shuffle();
console.log(d.draw().name);
//# sourceMappingURL=app.js.map