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

/** test TS Interface, 1.1. Interfaces are capable of describing the wide range of shapes that JavaScript objects can take. 
 * 
 * " readonly "       for making sure that the property of a object can't be mutated
 * " ? "              for optional property
 * " [...]: ... "     for excess property
 * 
interface Person {
    firstName: string,
    lastName: string,
};

function greet (person: Person): void {
    console.log(`hi ${person.lastName}, ${person.firstName}`);
}

function printMyFullName (person: Person): void {
    console.log(`${person.lastName}, ${person.firstName}`);
}

let person1 = {
    firstName: 'Alvin',
    lastName: 'Yen'
};

greet(person1);

// greet({ test: 'yoyoyo', firstName: 'tom' }); 
// warn!! strict check will be applied when pass in a lieral object as an argument
// undergo excess property checks

printMyFullName(person1);
*/

// ------------------------------------------------------------------------------------

/** test TS Interface, 1.2. about Excess Property Checks
interface TestExtraProperties {
    age: number;
    testExtraProp1?: string; // test1
    // [propName: string]: any; // test2, if we don't know the propertyName or type
}

function testExtraProperties (testObject: TestExtraProperties): void {
    console.log(testObject.age);
}

let testObject1 = {
    age: 20,
    testExtraProp1: ''
};

testExtraProperties(testObject1);

// test1
testExtraProperties({
    age: 20,
    testExtraProp1: ''
});

// test2
testExtraProperties({
    age: 20,
    testExtraProp1: '',
    // testExtraProp2: 123 // check test2 in interface TestExtraProperties
});
*/

// ------------------------------------------------------------------------------------

/* test TS Interface, another example for the definition of unsure object key
interface Test1 {
    test1: string;
}

let obj: {
    [x: string]: Test1
} = {

};

console.log(obj);
*/