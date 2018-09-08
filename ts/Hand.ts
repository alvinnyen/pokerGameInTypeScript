interface HandRank {
    name: string,
    payout: number,
};

interface Score {
    handRank: HandRank,
    scoringCards: Card[],
}

let HandRankings: {
    [x: string]: HandRank, // check object property type declaration in ts document
} = {
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

class Hand {
    private cards: Card[];

    public constructor (cards?: Card[]) { // !! 注意 question mark 是 for 不一定會有該parameter的定義
        if (cards) { // 因為? ，所以必須做這層確認
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }

    public getScore (): Score {
        // flush: all cards with the same suit
        // straight: all cards of sequential rank

        if (this.isFlush() && this.isStraight()) {
            if (this.has(10, 11, 12, 13, 1)) {
                // Royal Flush
                return {
                    handRank: HandRankings.Royal_FLUSH,
                    scoringCards: this.cards,
                }
            }

            // Straight Flush
            return {
                handRank: HandRankings.STRAIGHT_FLUSH,
                scoringCards: this.cards,
            }
        }

        if (has4()) {
            return {
                handRank: HandRankings.FOUR_OF_A_KIND,
                scoringCards: ,
            }
        }

        if (has3() && has2()) {
            return {
                handRank: HandRankings.FULL_HOUSE,
                scoringCards: this.cards,
            }
        }
    }
}
