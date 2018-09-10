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

/** test TS Setter/Getter
class TestSetterAndGetter {
    private _prop1: string = 'yo';

    public get prop21(): string {
        return this._prop1;
    }

    public set propToSetToProp1(value: string) { // setter不能設定回傳型態
        this._prop1 = value;
    }
}

let testSetterAndGetter = new TestSetterAndGetter();
console.log(testSetterAndGetter.prop21);
testSetterAndGetter.propToSetToProp1 = 'hihi';
console.log(testSetterAndGetter.prop21);
*/

