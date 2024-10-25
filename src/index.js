import { Tree, prettyPrint } from "./binarySearchTree.js";

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

// test.insert(10);
// test.deleteItem(1);

console.log(test.depth(test.root.right.left.left));
prettyPrint(test.root);
