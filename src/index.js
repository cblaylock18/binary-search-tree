import { Tree, prettyPrint } from "./binarySearchTree.js";

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.insert(10);
test.deleteItem(1);
console.log(test.find(6345));


prettyPrint(test.root);
