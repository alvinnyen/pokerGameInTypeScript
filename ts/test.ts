/** test TS Enums
enum Color {
    Green,
    Blue,
}

// let color: Color = Color.Green;
// console.log(color); // 0
// color = 1;
// console.log(color); // 1

function printColor (color: Color): void {
    switch(color) {
        case Color.Blue:
            console.log('blue');
            break;
        case Color.Green:
            console.log('green');
            break;
        default:
            console.log('default');
    }
}

printColor(Color.Blue);
printColor(1);

class TestEnum {
    private readonly testColor: Color;

    // constructor (color: Color) { 
    constructor (color: number) {
        this.testColor = color;

        // console.log(`color: ${color}`);
    }
}
new TestEnum(Color.Green);
new TestEnum(1);
*/
