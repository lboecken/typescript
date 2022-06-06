interface Student {
  id: number;
  name: string;
  grade: number;
}

let john: Student = { id: 0, name: 'john', grade: 80 };
let mary: Student = { id: 1, name: 'mary', grade: 79 };
let sue: Student = { id: 2, name: 'sue', grade: 67 };

type Students = Array<Student>;

let grades: Students = [john, mary, sue];

function generic(x: string): string {
  return x;
}

generic('hello');
