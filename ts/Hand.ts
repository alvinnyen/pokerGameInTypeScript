interface HandRank {
    name: string,
    payout: number,
};

interface Score {
    rank: HandRank,
    scoringCards: Card[],
}