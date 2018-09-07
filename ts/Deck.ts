class Deck {
    private cards: Card[];

    public constructor () {
        for (let s = 0; s < 4; s++) {
            for (let r = 0; r < 13; r++) {
                this.cards.push(new Card(r, s));
            }
        }
    }

    public shuffle (): void {
        this.cards.sort(() => Math.floor(Math.random() * 3 - 1)); // ??? check the result of random
    }

    public draw (): Card {
        return <Card> this.cards.shift();
    }
}   