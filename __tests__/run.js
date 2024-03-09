/**
 * Main test runner
 */

const { Parser } = require('../src/Parser')

const parser = new Parser();

const program = `33`; // returns number, if not # then returns null
// const program = `"Hello"`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
