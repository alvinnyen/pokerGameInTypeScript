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
;
var Kinds = /** @class */ (function () {
    function Kinds(cards) {
        var _this = this;
        this.kinds = {};
        cards.forEach(function (c) {
            var rank = c.rank;
            if (!_this.kinds[rank]) {
                _this.kinds[rank] = [];
            }
            _this.kinds[rank].push(c);
        });
    }
    Kinds.prototype.has = function (numOfKind) {
        return this.all(numOfKind)[0]; // 只需要第一個元素來確定has, 確定kind是否存在 
    };
    Kinds.prototype.all = function (numOfKind) {
        var result = [];
        var ranksInKinds = Object.keys(this.kinds);
        for (var i = 0; i < ranksInKinds.length; i++) {
            var rank = ranksInKinds[i];
            if (this.kinds[rank].length === numOfKind) {
                result.push({
                    cards: this.kinds[rank],
                    rank: +rank,
                });
            }
        }
        return result;
    };
    return Kinds;
}());
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
    Hand.prototype.isAceHighStraight = function () {
        var low;
        var high;
        var ranks = [];
        var cardRanks = this.cards.map(function (c) { return c.rank; });
        var firstIndexOfRank1 = cardRanks.indexOf(1);
        cardRanks[firstIndexOfRank1] = 14;
        low = high = cardRanks[0];
        // check if duplicate rank exists
        for (var i = 0; i < cardRanks.length; i++) {
            if (cardRanks[i] === 1)
                cardRanks[i] = 14;
            if (ranks.indexOf(cardRanks[i]) !== -1)
                return false;
            ranks.push(cardRanks[i]);
            if (cardRanks[i] > high)
                high = cardRanks[i];
            if (cardRanks[i] < low)
                low = cardRanks[i];
        }
        // check if poker straight
        return high - low === 4;
    };
    Hand.prototype.isAceLowStraight = function () {
        var low;
        var high;
        var ranks = [];
        low = high = this.cards[0].rank;
        // check if duplicate rank exists
        for (var i = 0; i < this.cards.length; i++) {
            var rank = this.cards[i].rank;
            if (ranks.indexOf(rank) !== -1)
                return false;
            ranks.push(rank);
            if (rank > high)
                high = rank;
            if (rank < low)
                low = rank;
        }
        // check if poker straight
        return high - low === 4;
    };
    Hand.prototype.isStraight = function () {
        return this.isAceHighStraight() || this.isAceLowStraight();
    };
    Hand.prototype.has = function () {
        // 再熟悉array.some、array.every、array.splice
        var ranks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ranks[_i] = arguments[_i];
        }
        return this.cards.some(function (c) {
            var rank = c.rank;
            var indexCardRankInTheRanks = ranks.indexOf(rank);
            if (indexCardRankInTheRanks !== -1) {
                ranks.splice(indexCardRankInTheRanks, 1);
            }
            // 因為只要ranks空了就不用再繼續往下做了，與every相比較之
            return ranks.length === 0;
        });
    };
    Hand.prototype.test = function () {
        var kinds = new Kinds(this.cards);
        console.log(kinds.has(3));
        console.log();
        console.log(kinds.has(2));
        console.log();
        console.log(kinds.has(1));
        console.log();
        console.log(kinds.has(4));
    };
    Hand.prototype.getScore = function () {
        // flush: all cards with the same suit
        // straight: all cards of sequential rank
        if (this.isFlush() && this.isStraight()) {
            if (this.has(10, 11, 12, 13, 1)) {
                // Royal Flush
                return {
                    handRank: HandRankings.ROYAL_FLUSH,
                    scoringCards: this.cards,
                };
            }
            ;
            // Straight Flush
            return {
                handRank: HandRankings.STRAIGHT_FLUSH,
                scoringCards: this.cards,
            };
        }
        var kinds = new Kinds(this.cards);
        var has4 = kinds.has(4);
        if (has4) {
            return {
                handRank: HandRankings.FOUR_OF_A_KIND,
                scoringCards: has4.cards,
            };
        }
        var has3 = kinds.has(3);
        var has2 = kinds.has(2);
        if (has3 && has2) {
            return {
                handRank: HandRankings.FULL_HOUSE,
                scoringCards: this.cards,
            };
        }
        if (has3) {
            return {
                handRank: HandRankings.THREE_OF_A_KIND,
                scoringCards: has3.cards,
            };
        }
        if (this.isFlush()) {
            return {
                handRank: HandRankings.FLUSH,
                scoringCards: this.cards,
            };
        }
        if (this.isStraight()) {
            return {
                handRank: HandRankings.STRAIGHT,
                scoringCards: this.cards,
            };
        }
        var all2 = kinds.all(2); // important to use Kinds.all
        if (all2.length === 2) { // 非常重要，再check !!
            return {
                handRank: HandRankings.TWO_PAIR,
                scoringCards: (function () {
                    var cards = [];
                    // all2.forEach(kindGroup => {
                    //     const kindGroupCards = kindGroup.cards;
                    //     for (let i = 0; i < kindGroupCards.length; i++) {
                    //         cards.push(kindGroupCards[i]);
                    //     }
                    // })
                    // 超簡潔，練習使用array.concat
                    all2.forEach(function (kindGroup) {
                        cards = cards.concat(kindGroup.cards);
                    });
                    return cards;
                })(),
            };
        }
        if (has2 && (has2.rank >= 11 || has2.rank === 1)) { // all2已經把2個pairs的狀況過濾掉了，所以這邊不可能再出現2個pairs以上，頂多存在1個pair也就是has2
            return {
                handRank: HandRankings.JACKS_OR_BETTER,
                scoringCards: has2.cards,
            };
        }
        return {
            handRank: HandRankings.NOTHING,
            scoringCards: [],
        };
    };
    return Hand;
}());
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
var hands = [
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
hands.forEach(function (h) {
    var s = h.getScore();
    console.log(s);
    console.log(s.handRank.name, s.handRank.payout, ',', s.scoringCards.map(function (c) { return c.name; }).join(', '));
    console.log(' ');
});
//# sourceMappingURL=app.js.map