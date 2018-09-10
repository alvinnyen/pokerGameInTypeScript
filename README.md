# Poker Game in TypeScript
## 專案說明

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

### static fields and methods
- 相較於非static，static的可以讓你直接用.運算子存取、使用，而不用初始化該class (因為static fields and methods屬於class所有、只有一份，不會隨著instance的不同而有所改變)
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