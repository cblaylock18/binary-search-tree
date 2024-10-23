import { Tree, prettyPrint } from "./binarySearchTree.js";

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.insert(10);
test.deleteItem(1);

test.inOrder(console.log);
prettyPrint(test.root);
