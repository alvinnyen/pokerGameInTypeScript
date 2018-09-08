interface HandRank {
    name: string,
    payout: number,
};

interface Score {
    rank: HandRank,
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