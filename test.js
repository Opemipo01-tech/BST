import { Tree } from "./main.js"


const array = [1,2,3,4,5,6,7,8,9,10]
const myTree = new Tree(array)
console.log(myTree.root);
console.log(myTree.isBalanced());
const values = []
myTree.postOrderForEach(value => values.push(value))
console.log(values)
