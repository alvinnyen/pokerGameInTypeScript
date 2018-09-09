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

interface KindGroup {
    cards: Card[],
    rank: number,
};

class Kinds {
    private kinds: {
        [rank: number]: Card[], // 再熟悉object property的type definition
    };

    public constructor (cards: Card[]) {
        this.kinds = {};

        cards.forEach(c => { // 再check array.forEach 及 它的優缺點
            const rank = c.rank;

            if (!this.kinds[rank]) {
                this.kinds[rank] = [];
            }

            this.kinds[rank].push(c);
        });
    }

    public has (numOfKind: number): KindGroup | undefined { // will return undefined if doesn't have
        return this.all(numOfKind)[0]; // 只需要第一個元素來確定has, 確定kind是否存在 
    }

    public all (numOfKind: number): KindGroup[] { // 有幾張一樣的
        let result: KindGroup[] = [];
        const ranksInKinds = Object.keys(this.kinds);

        for (let i = 0; i < ranksInKinds.length; i++) {
            const rank = ranksInKinds[i];

            if (this.kinds[rank].length === numOfKind) {
                result.push({
                    cards: this.kinds[rank],
                    rank: +rank,
                });
            }
        }

        return result;
    }    
}

class Hand {
    private cards: Card[];

    public constructor (cards?: Card[]) { // !! 注意 question mark 是 for 不一定會有該parameter的定義
        if (cards) { // 因為? ，所以必須做這層確認
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }

    private isFlush (): boolean  {
        let suit = this.cards[0].suit;

        return this.cards.every(c => c.suit === suit); // check array.every
    }

    public isAceHighStraight () :boolean {
        let low;
        let high;
        const ranks: number[] = [];

        const cardRanks: number[] = this.cards.map(c => c.rank);
        let firstIndexOfRank1 = cardRanks.indexOf(1);
        cardRanks[firstIndexOfRank1] = 14;

        low = high = cardRanks[0];

        // check if duplicate rank exists
        for (let i = 0; i < cardRanks.length; i++) {
            if (cardRanks[i] === 1) cardRanks[i] = 14;

            if (ranks.indexOf(cardRanks[i]) !== -1) return false;
            ranks.push(cardRanks[i]);
            
            if (cardRanks[i] > high) high = cardRanks[i];
            if (cardRanks[i] < low) low = cardRanks[i];
        }

        // check if poker straight
        return high - low === 4;
    }

    public isAceLowStraight () :boolean {
        let low;
        let high;
        const ranks: number[] = [];
        
        low = high = this.cards[0].rank;

        // check if duplicate rank exists
        for (let i = 0; i < this.cards.length; i++) {
            let rank = this.cards[i].rank;

            if (ranks.indexOf(rank) !== -1) return false;
            ranks.push(rank);
            
            if (rank > high) high = rank;
            if (rank < low) low = rank;
        }


        // check if poker straight
        return high - low === 4;
    }

    public isStraight (): boolean {
        return this.isAceHighStraight() || this.isAceLowStraight();
    }

    public has (...ranks: number[]): boolean { // 注意這邊的rest operator的技巧，還有限定其type為number array
        // 再熟悉array.some、array.every、array.splice

        return this.cards.some(c => {
            const rank = c.rank;
            const indexCardRankInTheRanks = ranks.indexOf(rank);

            if (indexCardRankInTheRanks !== -1) {
                ranks.splice(indexCardRankInTheRanks, 1);
            }

            // 因為只要ranks空了就不用再繼續往下做了，與every相比較之
            return ranks.length === 0;
        });
    }

    public test () {
        let kinds = new Kinds(this.cards);
        console.log(kinds.has(3)); 
        console.log();
        console.log(kinds.has(2));
        console.log();
        console.log(kinds.has(1));
        console.log();
        console.log(kinds.has(4));
    }

    // public getScore (): Score {
    //     // flush: all cards with the same suit
    //     // straight: all cards of sequential rank

    //     if (this.isFlush() && this.isStraight()) {
    //         if (this.has(10, 11, 12, 13, 1)) {
    //             // Royal Flush
    //             return {
    //                 handRank: HandRankings.Royal_FLUSH,
    //                 scoringCards: this.cards,
    //             }
    //         };

    //         // Straight Flush
    //         return {
    //             handRank: HandRankings.STRAIGHT_FLUSH,
    //             scoringCards: this.cards,
    //         };
    //     }  

    //     if (this.has4()) {
    //         return {
    //             handRank: HandRankings.FOUR_OF_A_KIND,
    //             scoringCards: ,
    //         };
    //     }

    //     if (this.has3() && this.has2()) {
    //         return {
    //             handRank: HandRankings.FULL_HOUSE,
    //             scoringCards: this.cards,
    //         };
    //     }

    //     if (this.isFlush()) {
    //         return {
    //             handRank: HandRankings.FLUSH,
    //             scoringCards: this.cards,
    //         };
    //     }

    //     if (this.isStraight()) {
    //         return {
    //             handRank: HandRankings.STRAIGHT,
    //             scoringCards: this.cards,
    //         };
    //     }

    //     if (this.has3()) {
    //         return {
    //             handRank: HandRankings.THREE_OF_A_KIND,
    //             scoringCards: this.cards,
    //         }
    //     }

    //     if (this.has2Pair()) {
    //         return {
    //             handRank: HandRankings.TWO_PAIR,
    //             scoringCards: this.cards,
    //         }
    //     }

    //     if (this.has2() && this.jacksOrBetter()) {
    //         return {
    //             handRank: HandRankings.JACKS_OR_BETTER,
    //             scoringCards: this.cards,
    //         }
    //     }

    //     return {
    //         handRank: HandRankings.NOTHING,
    //         scoringCards: [],
    //     }
    // }
}
