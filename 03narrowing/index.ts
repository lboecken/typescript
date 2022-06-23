// typeguard using typeof

function typeGuard(arg: number | number[] | null) {
  if (typeof arg !== 'number') {
    //   The ? operator is necessary because checking against 'number' does not
    // eliminate the possiblity that the value is 'null'
    arg?.filter((a, b) => {
      return a > b ? -1 : 1;
    });
  } else if (typeof arg === null) {
    //   While this throws no error it is actually unreachable since 'null' would trip
    // on the first 'if' statement
    console.log('arg is null');
  } else {
    //   Typescript now knows this MUST be a string due to the previous guard clauses
    arg.toFixed(3);
  }
}

typeGuard(null);

// other possible possible ways to type guard

function options(arg: string | string[] | undefined) {
  if (!!arg) {
    // does arg exist? First converted to opposite boolean and then converted back.
    // Over the top honestly and would never use it. You can just use '!' to check if
    // A value does NOT exist.
  } else if (arg) {
    // equivalent to the above
  }
}

function anotherWayTypeGuard(arg: number | number[] | null) {
  // since 'if' already coerces it's values to booleans, we can simply check if a
  // variable is
  if (arg && typeof arg !== 'number') {
    for (const s in arg) {
      console.log(s);
    }
  }
}

function aBadTypeGuard(arg: number | number[] | null) {
  // This is problematic because '0' is falsy. The same applies to empty arrays
  // strings, etc. Whether an object is empty is not the same as if it is absent
  if (arg) {
    if (typeof arg === 'number') {
      console.log(arg);
    } else {
      for (const num in arg) {
        console.log(num);
      }
    }
  }
}

function narrowingWithComparisonOperators(
  arg: number | string,
  arg2: number | null
) {
  if (arg == arg2) {
    // Both MUST be a number due to it being the only overlap they share.
    // Works with both regular and strict comparison operators
    arg.toFixed(3);
    arg2.toFixed(3);
  }

  if (arg2 === null) {
    // You can also directly check for values such as null (this addresses the issue)
    // found earlier when wrapping everything inside an if block.
  }
}

// using the 'in' statement

type Bird = { fly: () => void };
type Dog = { walk: () => void };

function moveAnimal(animal: Bird | Dog) {
  if ('fly' in animal) {
    // note this does get auto suggested since typescript can see 'fly' is a valid method
    animal.fly();
  } else {
    animal.walk();
  }
}

function usingInstanceOf(x: Date | string) {
  // Another way of narrowing that is useful
  if (x instanceof Date) {
    x.getFullYear();
  }
}

// types are declared at initial variable assignment.
// This can result in interesting behavior.
let x = Math.random() > 0.5 ? 0 : 'holla mundo';
// The original assignment to x was a union of 'string' | 'number'
// So the two below are fine.
x = 'a new string';
x = 42;
// But now this is not OK because 'true' is of type 'Boolean'
x = true;

// Typescript also understands the control flow
function padRight(arg: number | string, text: string) {
  // Hovering over 'arg' in both spots tells us the first is a number and the second
  // is a string. This is because typescript can infer that if typescript is a number
  // it will never be able to reach the else statement due to the return.
  if (typeof arg === 'number') {
    return ' '.repeat(arg) + text;
  } else return arg + text;
}

type Cat = {
  meow: () => void;
};

type Lion = {
  roar: () => void;
};

function isLion(animal: Lion | Cat): animal is Lion {
  return (animal as Lion).roar() !== undefined;
}

function makeNoise(animal: Lion | Cat) {
  if (isLion(animal)) {
    animal.roar();
  } else {
    animal.meow();
  }
}

// Discrimnating Union
// Unions that two or more interfaces / type that share a property that is used
// to discriminate between them

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Sphere2 {
  kind: 'square';
  sideLength: number;
}

type Shape = Sphere2 | Circle;
// Typescript can infer which shape is which using shape.kind, the discrimnating
// property that both shapes share.

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return shape.radius ** 2 * Math.PI;
    case 'square':
      return shape.sideLength ** 2;
    default:
      // This guarantees that anything that does not catch on the previous shape.kind
      // cases gets assigned to 'never' which is immediately raises a typescript error
      // this protects against extending a function improperly since it will raise an error.
      // Therefore extendting the type 'Shape' will cause an error since any new shape
      // Would be assigned to 'never'
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
