class Deck {
    private cards: Card[];

    public constructor () {
        for (let s = 0; s < 4; s++) {
            for (let r = 0; r < 13; r++) {
                this.cards.push(new Card(r, s));
            }
        }
    }
}   