import { Tree, prettyPrint } from "./binarySearchTree.js";

// Driver Script

// Create a binary search tree from an array of random numbers < 100.
// You can create a function that returns an array of random numbers every time you call it if you wish.

let testArray = [];

for (let i = 0; i < 100; i++) {
  testArray.push(Math.floor(Math.random() * 100));
}

const testTree = new Tree(testArray);

// Confirm that the tree is balanced by calling isBalanced.

console.log(testTree.isBalanced());

// Print out all elements in level, pre, post, and in order.

testTree.levelOrder(console.log);
testTree.preOrder(console.log);
testTree.postOrder(console.log);
testTree.inOrder(console.log);

// Unbalance the tree by adding several numbers > 100.

testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));
testTree.insert(Math.floor(Math.random() * 10000));

// Confirm that the tree is unbalanced by calling isBalanced.

prettyPrint(testTree.root);
console.log(testTree.isBalanced());

// Balance the tree by calling rebalance.

testTree.rebalance();

// Confirm that the tree is balanced by calling isBalanced.

console.log(testTree.isBalanced());

// Print out all elements in level, pre, post, and in order.

testTree.levelOrder(console.log);
testTree.preOrder(console.log);
testTree.postOrder(console.log);
testTree.inOrder(console.log);

prettyPrint(testTree.root);
