
let name: string = 'John'
let age:number = 30;
let isDone:boolean = false

// for array
let list: number[] = [1, 2, 3]
let list2:Array<string> = ["a", "b"] // alternative syntax

// for objects(inline)
let person: {name: string, age: number} = {
  name: "Alice",
  age: 22
}

// Functions – Parameters & Return Types
// funtion 
function greet(name: string, isFormal: boolean):string {
  return isFormal ? "Hello: Mr./Mrs." + name : `Hi:  + ${name}`
}

// Arrow function
const add = (a: number, b: number): number => a + b

greet('123', true)

// Interfaces & Type Aliases (for objects / shapes)

interface User {
  id: number,
  name: string,
  email?: string // optional property or equivalent to email: string | undefined;
}

function register(user: User): void {
  console.log(user.name + " registered successfully!")
}

// Union and Intersection Types

let id: string | number; //union type
id: 123; // valid
id: "abc"; // also valid

// intersection (RadioReceiver, but useful)
type draggable = { drag: () => void }
type resizable = { resize: () => void }
type UIwidget = draggable & resizable;

// Type Aliases and Literal Types
type Direction = "up" | "down" | "left" | "right"; // literal type

let move: Direction = "up"; // valid
move = "down"; // also valid
// move = "forward"; // Error: not assignable to type 'Direction'

// Generics (reusable types)
// Allow types to be “passed” as parameters to a function or class.

function identity<T>(value: T): T {
  return value
}

let num = identity<number>(42) // T is number
let str = identity<string>("Hello") // T is string

// with arrays
function getFirst<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined
}

// Write a generic getProperty(obj: T, key: K) using keyof T (advanced, but good to know).

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = {
  name: "Alice",
  age: 30
}

console.log(getProperty(user, "name")) // Output: "Alice"
console.log(getProperty(user, "age")) //output: 30

// any, unknown, and never
// any – turns off type checking (use sparingly, as last resort).

// unknown – safer than any. You must check/assert the type before using it.

// never – function that never returns (e.g., throws error or infinite loop).

let Something: unknown = "Hello"
// Something.toUpperCase() // Error: Object is of type 'unknown'

if(typeof Something === "string") {
  console.log(Something.toUpperCase()) // Now it's safe to use as string
}

// Classes (with access modifiers)
// TS add: public, private, protected access modifiers to control visibility of class members.

class Person {
  constructor(public name: string, private age: number) {}
  greet() {
    console.log(`Hello, my name is ${this.name} is ${this.age} years old.`)
  }
}

const p = new Person("Alice", 30)
p.name // valid
// p.age // Error: Property 'age' is private and only accessible within class 'Person'.

// Convert a JS class (e.g., Counter) to TS with proper types and private for internal state.

// in JS
class Counter {
  constructor() {
    this.count = 0
  }
  increment() {
    this.count++
  }
  getCount() {
    return this.count
  }
}

// in TS

class Counter {
  private count: number
  constructor() {
    this.count = 0
  }
  increment(): void {
    this.count++
  }
  decrement(): void {
    this.count--
  }
  getCount(): number {
    return this.count
  }
}

const c = new Counter()
c.increment()
c.increment()
console.log(c.getCount()) // Output: 2

// Type Guards & Narrowing
// Use typeof, instanceof, or custom predicates to narrow a union type.

function printId(id: number | string) {
  if(typeof id === "number") {
    console.log("ID is a number: " + id.toFixed(2))
  } else {
    console.log("ID is a string: " + id.toUpperCase())
  }
}

//custom guard
function ifFish(pet: Fish | Bird ): pet is Fish {
  return (pet as Fish).swim !== undefined
}

// Write a function that accepts string | string[] and returns the length (if string, return its length; if array, return array length).

function getLength(value: string | string[]): number {
  if(typeof value === "string") {
    return value.length
  } else {
    return value.length
  }
}

// Compiler & Configuration (tsconfig.json)