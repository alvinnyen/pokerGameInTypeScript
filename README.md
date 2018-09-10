# Poker Game in TypeScript
## 專案說明

## to study
- [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/docs/types/readonly.html)
- [TypeScript Tutorial](https://javabrains.thinkific.com/courses/typescript-basics)

## Note
### enum
- concept
    - enums allow us to define a set of "named constants"
    - make number more expressive
- pros of enum
    - why not use "string" ?
        - 假設想用字串表達顏色、並搭配switch case
            - 相較於number，佔用了相對多的記憶體空間，多了很多電腦不在意的資訊
            - the risk of typos
    - why not use "number" ?
        - 使用0, 1, 2...表達數字
            - 不可讀、難以記憶
    - 使用enum做列舉
        ```javascript=
            enum Color {
                Gray,
                Green,
                Blue
            }

            function printColor (color: Color): void {
                switch(color) {
                    case Color.Gray:
                        console.log('gray');
                        break;
                    case Color.Green:
                        console.log('green');
                        break;
                    case Color.Blue:
                        console.log('blue');
                        break;
                    default:
                        console.log('default');
                }
            }

            printColor(Color.Gray);    // "gray"
            printColor(Color.Blue);    // "blue"
            console.log(Color.Gray);   // 0
            console.log(Color.Green);  // 1
        ```
- ts中的enum最後都被轉成number
    ```
        console.log(Color.Gray);   // 0
        console.log(Color.Green);  // 1
    ```
- ts中的enum不像其他語言那樣嚴格
    ```
        // it works fine
        printColor(0);    // "gray"

        class TestEnum {
            private readonly testColor: Color;

            // constructor (color: Color) { // same as next line, it works fine
            constructor (color: number) {
                this.testColor = color;

                console.log(`color: ${color}`);
                console.log(' ');
            }
        }
        new TestEnum(Color.Green);
        new TestEnum(1);
    ```
- 關於enum給值
    - default從 "0" 開始給定數字給這些enum type
        ```javascript=
            enum Color {
                Gray,
                Green,
                Blue
            }
        ```
    - 可以customize數字值
    - 一旦customize數字值，則之後的enum type都會跟著這個customize的值而定
        ```javascript=
            enum Color {
                Gray,         // 0
                Green = 100,  // 100
                Blue          // 101 !!
            }
        ```
    - 如果要改回default形式的值就只能再重新給定
        ```javascript=
            enum Color {
                Gray, // 0
                Green = 100, // 100
                Blue = 2 // 2
            }
        ```
- enum最後會被轉為 IIFE (Immediately Invoked Function Expression, 立即[執行]函式)
    - ![](https://i.imgur.com/32U8vPt.png)

### class static property and methods
- 相較於非static，static的可以讓你直接用.運算子存取、使用，而不用初始化該class (因為static propertyies and methods屬於class所有、只有一份，不會隨著instance的不同而有所改變)
- i.e.
    ```
        class Helpers {
            // public PI: number = 3.14; // 必須 new Helpers().PI 才能取用

            static PI: number = 3.14; // 可以直接用 Helpers.PI 來做取用

            static calcCircumference(diameter: number): number { // i.e. Helpers.calcCircumference(123)
                return this.PI * diameter;
            }
        }
        
        console.log(2 * Helpers.PI);
        console.log(Helpers.calcCircumference(8));
    ```

### Interface vs Type alias
- to practice !!
- [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)
- [Typescript: Interfaces vs Types](https://fullstack-developer.academy/typescript-interfaces-vs-types/)
- [Typescript: Interfaces vs Types on stackoverflow](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types)

### readonly modifier
- [ref.: TypeScript Deep Dive: readonly](https://basarat.gitbooks.io/typescript/docs/types/readonly.html)
- pros
    - for avoiding unexpected mutation
    - to practice !!
-  to mark individual properties on an interface as readonly
    ```
        function foo(config: {
            readonly bar: number,
            readonly bas: number
        }) {
            // ..
        }

        let config = { bar: 123, bas: 123 };
        foo(config);
        // You can be sure that `config` isn't changed
    ```
- can use readonly in interface and type definitions as well
    - [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)
    ```
        type Foo = {
            readonly bar: number;
            readonly bas: number;
        }

        // Initialization is okay
        let foo: Foo = { bar: 123, bas: 456 };

        // Mutation is not
        foo.bar = 456; // Error: Left-hand side of assignment expression cannot be a constant or a read-only property
    ```
- can even declare a class property as readonly
    ```
        class Foo {
            readonly bar = 1; // OK
            readonly baz: string;
            constructor() {
                this.baz = "hello"; // OK
            }
        }
    ```

### setter and getter
- using get and set keyword for creating a setter/getter in a convinient way
- 用set/get 關鍵字可以創造方便的操做class property的setter/getter
    - 方便的操作方式：讓你像操作class static property一樣來操作，而不是用function的形式來操作 
        - 即使setter和getter是以function的形式來做定義
- setter和getter可以設定為任意名稱，不一定要和作為操作對象的property name一樣
- setter不能/沒必要設定回傳型態
- ex.
    ```
        class Plant {
            private _species: string = 'default';
            
            get species() {
                return this.__species;
            }
            
            set species(value: string) {
                if (value.length > 3) {
                    this._species = value;
                }
            }
        }
        
        let plant = new Plant();
        console.log(plant.species); // default
        plant.species = 'AB'; 
        console.log(plant.species); // default
        plant.species = 'green species'; 
        console.log(plant.species); // green species
    ```