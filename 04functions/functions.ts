// 'test' takes a function as an argument which (1) takes a string argument
// and (2) returns nothing
function test(fn: (a: string) => void) {
  fn('string');
}
function print(a: string) {
  console.log(a);
}
// 'test' accepts the function 'print' as an argument and calls it with 'string'
// as the argument
test(print);

// You can type alias a function
type genericFunction = <Type>(a: Type) => Type;

function accepterOfGenerics(a: genericFunction, b: any) {
  a(b);
}

// Additional properties on functions
// Not sure how this is useful. Maybe in a library?

type DescribableFunction = {
  description: string;
  (some: number): boolean;
};

// You can also add constructors to an interface
// In this case, regardless of input, a new instance of 'Date' is supposed to be
// returned. Poor example but demonstrates that it works.
interface Constructor {
  new (s: string): Date;
}
function ConstructorTester(arg: Constructor) {
  return new arg('s');
}
function NewDate(s: string) {
  return new Date(s);
}

function NewString(s: string) {
  return new String(s);
}
// This now fails because 'NewString' is a (arg:string): String signature. But
// 'Constructor' requires a (arg:string): Date signature
ConstructorTester(NewString);
// But this works because the signatures match
ConstructorTester(NewDate);

// ****** NOT QUITE GETTING CONSTRUCTOR SIGNATURES ********

// Generics. Are for when there is a clear relationship between I/O

function generic<Type>(s: Type): Type {
  return s;
}

// Multiple Generics are also possible
function generic<Input, Output>(a: Input, fn: (s: Input) => Output): Output {
  return fn(a);
}

// Constraining Generics
// Whatever is assigned to 'Type' must have a parameter called 'length' that is a number.
function limitedGeneric<Type extends { length: number }>(
  a: Type,
  b: Type
): Type {
  return a.length > b.length ? a : b;
}

// Misuse of generics
// This is illegal because 'badGeneric' promises to return something of 'Type'
// Not just something that matches the constraint on 'Type'. Hence the extends keyword
function badGeneric<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length > minimum) return obj;
  else return { length: minimum };
}

// type inference and generics
// Generally typescript can infer the Type passed into a function. However in some
// cases this can fail
function combine<Type>(arg1: Type[], arg2: Type[]): Type[] {
  return arg1.concat(arg2);
}
// This fails due to Type being assigned to string.
const combinedArray = combine([1, 2, 3], ['holla']);
// However the definition of Type can be manually expanded.
const goodCombinedArray = combine<number | string>([1, 2, 3], ['holla']);

// GENERIC guidelines
// Constrain via the TYPE parameter, NOT extending it
// Return type is 'Type' since TS can figure it out when evaltuating
function goodConstrain<Type>(arg: Type[]) {
  return arg[0];
}
// return type is 'any' since its preset
function badConstrain<Type extends any[]>(arg: Type) {
  return arg[0];
}

// Make sure a Type parameters actually links two values

// PARAMETERS
// optional via ?

function roundDown(n: number, factor?: number) {
  n.toFixed(factor);
}
// Both OK
roundDown(10, 1);
roundDown(10);
// Note -> This works since this is what actually happens when no param is passed,
// hence TS allows it since it is normal JS behavior.
roundDown(10, undefined);

// Default params
function raiseToPower(n: number, factor = 10) {
  n.toFixed(factor);
}
// factor is inferred to be of type number
raiseToPower(10, 'string');
// And it can be left out since it has a default value of 10
raiseToPower(19);

// Problem with optional parameters in callbacks.
// due to TS

// FUNCTION OVERlOADS
class IEmployee {}

function makeEmployee(name: string, id: number): void;
function makeEmployee(fromString: string): void;
function makeEmployee(idOrString: string, id?: number): void {
  if (id) {
    console.log('from params');
  } else {
    console.log('from string');
  }
}

function overload(s: string): string;
function overload(n: number): number;
function overload(): void;
function overload(s_or_n?: string | number) {
  if (typeof s_or_n == 'number') {
    return s_or_n;
  } else if (typeof s_or_n == 'string') {
    return s_or_n;
  } else {
    console.log('nothing was passed in');
  }
}

// Overload best practices --> Always prefer union types for parameters.
// Overloads are cool and gimmicky but seem to not be the most useful.

// OVERIDING THIS

function doSomething(this: string) {
  this.replace('a', 'b');
}

// This does NOT work with arrow functions due to them grabbing the global 'this'
const bad = (this: string) => console.log(this);

// OTHER TYPES

// Void
// void !== undefined

// object
// object !== Object (a global thing you will never use)
// x is object if x NOT primitive

// unknown
// Like 'any' but nothing can be done to the value due to it being unkown/ So a touch
// safer thats all

// But should I use it Or create a type to capture all possible outputs
function parseFromString(s: string): unknown {
  return JSON.parse(s);
}

// NEVER
// When no other option is left in a union or a function throws an expection or ends exectuion

function neverUnion(s: string | number) {
  if (typeof s == 'string') {
    console.log(s);
  } else if (typeof s == 'number') {
    console.log(s);
  } else {
    console.log(s);
    // s is not NEVER. This is actually unreachable.
  }
}
// Function type

// This is a bad use of Function due the implicit return of 'any' of the function.
function functionCaller(fn: Function) {
  return fn();
}

// REST PARAMETERS
// Come last, use spread operator
function restParameter(m: number, ...n: number[]) {
  return n.map((n) => n ** m);
}

const a = restParameter(10, 1, 2, 3, 4, 5, 6);

// More rest parameter behavior
const arg = [1, 2];
const angle = Math.atan2(...arg);
// This does not work due to the arg being of type 'number[]' which may have more
// or less than two digits
// The solution is this
// Declaring it as a const enforces the number of items in the array
let arg2 = [1, 2] as const;
const angle2 = Math.atan2(...arg2);
// This now fails because the array is declared as a read-only tuple.
arg2.push(1);

// destructuring params
function destruct({ a, b, c }: { a: number; b: number; c: number }) {}
// OR you can use a type
type destructParams = { a: number; b: number; c: number };
function destructWithType({ a, b, c }: destructParams) {}
