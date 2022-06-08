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
