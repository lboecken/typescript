// ******PROPERTY MODIFIERS*******
//      ******OPTIONAL MODIFIERS*******
// Must come before any required params.
// Marked via question mark
function optionalModifier(b: string, a?: number) {
  if (a) {
    console.log(a, b);
  } else {
    console.log(b);
  }
}
// ******readonly PROPERTIES*******
interface IReadOnly {
  readonly name: string;
}

function updateName(a: IReadOnly) {
  a.name = 'new_Name';
  // Fails due to name being a read-only property
  // This is only a typescript behavior and would function in JS code.
}

interface IResident {
  readonly resident: { name: string; age: number };
}
// read only is strict in the sense that it only makes that attribute unchangeable
// However its sub-attributes are fair game.
function readOnlyModified(obj: IResident) {
  obj.resident.name = 'new_name';
  obj.resident.age++;
  obj.resident = { name: 'John', age: 45 };
}

// read only can also be broken via aliasing
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let newPerson: ReadonlyPerson = { name: 'John', age: 45 };

let writeablePerson: Person = newPerson;
// Due to typescript using a structural type system it only checks if these two
// types can conform and does not check for the read-only part of it.
writeablePerson.age++;

// Readonly is best when used to signal intent for other developers. Similar to
// Pythons approach of using _method(): inside of classes

//       ******INDEX SIGNATURES*******

// Used if you are unsure of the exact values of a potential object but have an idea of its potential shape
interface IEmployee {
  [index: number]: string;
  name: string;
  age: number;
}

const sally: IEmployee = {
  name: 'sally',
  age: 45,
//   This works due to the index signature allowing string indexes
  1: 'salaried'
//   But this now fails because string indexes are not allowed
  department: 'accounting',
};

interface IBetterEmployee {
    // readyonly can be used on indexes as well
    readonly [index: string | number]: string | number;
    name: string;
    age: number;
}

const susan: IBetterEmployee = {
    name: 'sally',
    age: 45,
    1: 'salaried',
    department: 'accounting',    
}
// Because it is readyonly this is now no longer good for updating. 
susan.department = 'marketing'

//      ******EXTENDING TYPES*******
interface Sphere {
    radius: number
    }
interface Colorful {
    color: string
}

interface ColorfulCircle extends Sphere, Colorful {}

const colorCircle: ColorfulCircle = {
    radius: 45,
    color: 'blue'
}

//    ******INTERSECTION TYPES*******
// Slightly different syntax for how to extend either
type ColorfulCircle2 = Sphere & Colorful

// Intersection can also be done inside a function params
function draw(circle: Sphere & Colorful) {
  console.log(circle.color)
  console.log(circle.radius)
}
//    ******INTERFACES VS INTERSECTIONS*******

// They handle conflict slightly differently, so sometimes you prefer one over the other.

// ******GENERIC OBJECT TYPES*******
interface NumberBox {
  contents: number
}

interface StringBox {
  contents: string
}
interface BoolBox {
  contents: boolean
}
// Way too much work

// Use generics instead!
// Not immutable but type restricted still
interface GenericBox<Type> {
  contents: Type
}

let stringBox: GenericBox<string> = {contents: 'hello world'}
let numberBox: GenericBox<number> = {contents: 42}
let boolBox: GenericBox<boolean> = {contents: false}

stringBox.contents = 45
numberBox.contents = 'hello world'
boolBox.contents = true


type OrNull<Type> = Type | null;

const char: OrNull<string> = 'hello world';
console.log(char)
type OneOrMany<Type> = Type | Type[]
let characters: OneOrMany<string> = ['hello', 'world']
characters = 'none'

//    ******ARRAY TYPE*******
// This is another generic 


// ******READONLY ARRAY TYPE*******
// ******TUPLE TYPES*******
// ******READONLY TUPLE TYPES*******
