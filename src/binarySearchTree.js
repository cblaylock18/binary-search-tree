class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

const buildTree = function createABinarySearchTreeFromArrayOfValues(array) {
  // sort array and remove duplicates
  return mergeSortAndRemoveDuplicates(array);

  //   Set The middle element of the array as root.
  // Recursively do the same for the left half and right half.
  // Get the middle of the left half and make it the left child of the root created in step 1.
  // Get the middle of the right half and make it the right child of the root created in step 1.
};

function merge(left, right) {
  let sortedArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else if (left[0] > right[0]) {
      sortedArray.push(right.shift());
    } else if (left[0] === right[0]) {
      sortedArray.push(left.shift());
      right.shift();
    }
  }
  return [...sortedArray, ...left, ...right];
}

function mergeSortAndRemoveDuplicates(array) {
  const n = array.length;

  // base case
  if (n <= 1) {
    return array;
  }

  // mid point
  const mid = Math.floor((n - 1) / 2);

  // recursion to get to single value or blank array
  const left = mergeSortAndRemoveDuplicates(array.slice(0, mid + 1));
  const right = mergeSortAndRemoveDuplicates(array.slice(mid + 1, n));

  return merge(left, right);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export { Tree, prettyPrint };
