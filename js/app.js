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
            for (var r = 1; r <= 13; r++) { // 注意!! rank是從1開始!!
                this.cards.push(new Card(r, s));
            }
        }
    }
    Deck.prototype.shuffle = function () {
        // this.cards.sort(() => Math.floor(Math.random() * 3 - 1)); // ??? check the result of random
        var _a;
        for (var i = this.cards.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); // why i+1 ?? => because of (i = 0) case
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1]; // ES6 destructuring assignment
        }
    };
    Deck.prototype.draw = function () {
        return this.cards.shift();
    };
    return Deck;
}());
;
var HandRankings = {
    ROYAL_FLUSH: {
        name: 'Royal Flush',
        payout: 800,
    },
    STRAIGHT_FLUSH: {
        name: 'Straight Flush',
        payout: 50,
    },
    FOUR_OF_A_KIND: {
        name: 'Four of a Kind',
        payout: 25,
    },
    FULL_HOUSE: {
        name: 'Full House',
        payout: 9,
    },
    FLUSH: {
        name: 'Flush',
        payout: 6,
    },
    STRAIGHT: {
        name: 'Straight',
        payout: 4,
    },
    THREE_OF_A_KIND: {
        name: 'Three of a Kind',
        payout: 3,
    },
    TWO_PAIR: {
        name: 'Two Pair',
        payout: 2,
    },
    JACKS_OR_BETTER: {
        name: 'Jacks or Better',
        payout: 1,
    },
    NOTHING: {
        name: 'Nothing',
        payout: 0,
    },
};
var Hand = /** @class */ (function () {
    function Hand(cards) {
        if (cards) { // 因為? ，所以必須做這層確認
            this.cards = cards;
        }
        else {
            this.cards = [];
        }
    }
    Hand.prototype.isFlush = function () {
        var suit = this.cards[0].suit;
        return this.cards.every(function (c) { return c.suit === suit; }); // check array.every
    };
    return Hand;
}());
// let c = new Card(1, Suit.Diamonds);
// console.log(c.name);
// console.log();
// let d = new Deck();
// d.shuffle();
// console.log(d.draw().name);
var hand1 = new Hand([
    new Card(4, Suit.Diamonds),
    new Card(5, Suit.Hearts),
    new Card(6, Suit.Diamonds),
    new Card(7, Suit.Diamonds),
    new Card(8, Suit.Diamonds),
]);
var hand2 = new Hand([
    new Card(4, Suit.Diamonds),
    new Card(5, Suit.Diamonds),
    new Card(6, Suit.Diamonds),
    new Card(7, Suit.Diamonds),
    new Card(8, Suit.Diamonds),
]);
console.log(hand1.isFlush());
console.log(hand2.isFlush());
//# sourceMappingURL=app.js.map