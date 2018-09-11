# Poker Game in TypeScript
## 專案說明

## to study
- [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/docs/types/readonly.html)
- [TypeScript Tutorial](https://javabrains.thinkific.com/courses/typescript-basics)

## Note
### Math.random()
- x: [0, 1)
    - 0 <= x < 1
- y * x: z [0, y)
    - 0 <= z < y
    - i.e. 5 * x => [0, 5)
        - x => 0.9999999...
        - x * 5 => 4.99999...
- 通常會再搭配 Math.floor 使用

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
### interface
- interface可以應用在I. object的定義 (apply to object declaration or function paramter), II. function的定義 (Function Type), III. class的定義

#### 1.  basic concept with Object Type
- basic modifier
    -  `readonly`:    for making sure that the property of a object can't be mutated
    - `?`:            for optional property
        ```
            public constructor (cards?: Card[]) {
                if (cards) { // 因為unsure ，所以必須做這層確認
                    this.cards = cards;
                } else {
                    this.cards = [];
                }
            }
        ```
    - `[...]: ... `:  for excess property
    - check the test.ts for detailed imformation
##### 1.1. the basic about interfaces
- why interface ?
    - case 1. 沒有強制object contract in the signature of function parameter的情況下，可能印出undefined
        ```javascript=
            function greet(person: any) {
                console.log(`hi, ${person.name}`);
            }
            
            const person = {
                firstName: 'alvin'
            };
            
            greet(person); // 會印出 `hi, undefined`
        ```
    - case 2. 強制object contract in the signature of function parameter (則如果沒有按照contract走的話會出現warnning)，但如果多個function的parameter的signature是一樣的，則可能需要一次改多個地方，麻煩且容易出錯、漏改
        ```javascript=
            function greet(person: {name: string}) {
                console.log(`hi, ${person.name}`);
            }
            
            function changeName(person: {name: string}) {
                person.name = 'Anna';
            }
            
            const person = {
                name: 'alvin'
            };
            
            greet(person); 
            changeName(person);
            greet(person); 
        ```
        - 使用interface作為contract，用在function的signature來確定傳進來的引數一定要有哪些properties
            ```javascript=
                interface NamedPerson {
                    name: string
                }
            
                function greet(person: NamedPerson) {
                    console.log(`hi, ${person.name}`);
                }
                
                function changeName(person: NamedPerson) {
                    person.name = 'Anna';
                }
                
                const person = {
                    name: 'alvin'
                };
                
                greet(person); 
                changeName(person);
                greet(person); 
            ```
    - a way to gurantee your code that certain properties or methods or whatever are available
- 在傳入object instance而非literal object的情況下，contract中是限定 `一定要有` 該property，而不是 `只能有` 該property (literal object的strict check才會是`只能有`)
- 如果是傳入`literal object`，則會用`strict check`，也就是你必須將object一定含有 或 可能含有 (使用?運算子在property name定義的最後面) 的 properties 都定義清楚
##### 1.2. Excess Property Checks
- 當採用literal object的方式傳入function時，會檢查的相對嚴格
    - ![](https://i.imgur.com/vd9b3q0.png)
- 所以，除了一定會有的property之外，可能會有的property也要定義！！ (使用?運算子在property name定義的最後面)，如果可能directly passing literal object來作為function引數的情況下
    - possible but not require
    - 如果可能有其他property傳入，但你不確定是否一定會傳入
        - propertyName可以隨便取
        - [] 不代表陣列，只是個表達keyword
        - [properName: string] 是因為object property key都是string
        - [properName: string] 如果你知道可能傳入的形態的話也可以加以定義
        - 和possible but not require的差異在於，你沒辦法明確的給定property name(key)或其型態
    ```javascript=
        interface NamedPerson {
            firstName: string;
            age?: number; // possible but not require
            [properName: string]: any;
            [properName: string]: number;
        }
    ```
##### 1.3. a complex example
```javascript=
    interface NamedPerson {
        firstName: string;
        age?: number; 
        [properName: string]: any;
        [properName: string]: number;
        greet(lastName: string): void; // object中的function的signature也可以在interface其中定義
    }
```
##### 1.4. Interface Inheritance
- 就像之前學到的透過繼承來extend class，we can do the some for instances
- 也可以overide父interface的設定，使更嚴格的定義、要求，如下列的age
    ```javascript=
        // interface inheritance
        interface NamedPerson {
            ....
        }

        interface AgedPerson extends NamedPerson {
            age: number; // 也可以overide父interface的設定，使更嚴格的定義、要求，如age
        }

        const oldPerson: AgedPerson = {
            代表這邊所帶的properties不只要fulfill NamedPerson的定義，還必須fulfill AgedPerson的定義
        }
    ```
##### 1.5. what happens once interface get compiled
- 觀察compiled過後的扣
    - 居然更短？
    - 因為根本就沒有根據interface的定義去做轉譯，TS的compiler只會在compiling time的時候提醒你！！
    - 因為ES5根本不知道、不認識這些TS的types，所以當然沒有辦法用ES5去實作interface這樣的功能，所以我們觀察到的才會是interface相關的ts code在compiling過後沒有任何的轉譯
    - tatally ingnored

#### 2. Interfaces and Function Types
- you can also create a interface for function types
    - 使用小括號，
    - 且這種interface只能用在function
        ```javascript=
            interface DoubleValueFun {
                (num1: number, num2: number): number;
            }
            
            let myDoubleValueFun: DoubleValueFun; // 記得必須是let
            myDoubleValueFun = function (val1: number, val2: number)  { // 參數名稱可以不一樣!!! 記起來!!!
                return val1 + val2;
            }
        ```

#### 3. using Interfaces with Classes
- interface除了也可以用在class的定義
    - 使用關鍵字implements
    - 在class的定義中使用interface，並不用考慮literal object作為引數傳入時的嚴格限定
    - 也就是，在使用interface時，只有lieral object作為引數傳入時的狀況下需要考慮嚴格限定 (把可能的也標出來 with a.`$key?: $type;` b.`[$key: string]: any||number..etc.;`)
- i.e.
    ```javascript=
        interface NamedPerson {
            firstName: string;
            age?: number; // 雖然不一定要，但定義出來其實更明確，使扣更好維護
            greet(lastName: string): void; // object中的function的signature也可以在interface其中定義
        }
        
        class Person implements NamedPerson {
            firstName: string;
            lastName: string; // see~"不用"像literal object作為引數傳入時一樣，去做嚴格限定!!
            greet(lastName: string) {
                console.log(`hi ${lastName}`);
            }
        }
    ```
- One of the most common uses of interfaces in languages like C# and Java, that of explicitly enforcing that a class meets a particular contract, is also possible in TypeScript.
    ```
        interface ClockInterface {
            currentTime: Date;
            setTime(d: Date);
        }

        class Clock implements ClockInterface {
            currentTime: Date;
            setTime(d: Date) {
                this.currentTime = d;
            }
            constructor(h: number, m: number) { }
        }
    ```
    - `Interfaces describe the public side of the class, rather than both the public and private side. This prohibits you from using them to check that a class also has particular types for the private side of the class instance.`
- 結論
    - the interface is a contract which can be signed or which can be used as a type
    - and which then makes sure all conditions set up in the interface
    - so that property being a required one, that being one option or one and the method you're being required with that exact argument and return type.
    - all these conditions have to be fulfilled by whatever