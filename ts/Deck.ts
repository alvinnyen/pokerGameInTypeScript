class Deck {
    private cards: Card[];

    public constructor () {
        this.cards = [];

        for (let s = 0; s < 4; s++) {
            for (let r = 1; r <= 13; r++) { // 注意!! rank是從1開始!!
                this.cards.push(new Card(r, s));
            }
        }
    }

    public shuffle (): void {
        // this.cards.sort(() => Math.floor(Math.random() * 3 - 1)); // ??? check the result of random

        for (let i = this.cards.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1) ); // why i+1 ?? => because of (i = 0) case
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // ES6 destructuring assignment
        }
    }

    public draw (): Card {
        return <Card> this.cards.shift();
    }
}   