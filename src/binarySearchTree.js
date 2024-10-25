const buildTreeRecursive =
  function createABinarySearchTreeFromArrayOfValuesRecursively(array) {
    // base cases to stop recursion
    if (array.length === 0) {
      return null;
    }

    if (array.length === 1) {
      return new Node(array[0]);
    }

    const n = array.length;
    // mid point
    const mid = Math.floor(n / 2);

    // Set The middle element of the array as root.
    const root = new Node(array[mid]);

    // Recursively do the same for the left half and right half.
    // Get the middle of the left half and make it the left child of the root created in step 1.
    root.left = buildTreeRecursive(array.slice(0, mid));

    // Get the middle of the right half and make it the right child of the root created in step 1.
    root.right = buildTreeRecursive(array.slice(mid + 1));
    return root;
  };

const buildTree = function sortArrayThenCallRecursiveFunction(array) {
  // sort array and remove duplicates
  const sortedArray = mergeSortAndRemoveDuplicates(array);
  if (!sortedArray) return;
  return buildTreeRecursive(sortedArray);
};

// NOTE: using shift increases time complexity since shift is O(n^2) inside a loop
// function merge(left, right) {
//   let sortedArray = [];
//   while (left.length && right.length) {
//     if (left[0] < right[0]) {
//       sortedArray.push(left.shift());
//     } else if (left[0] > right[0]) {
//       sortedArray.push(right.shift());
//     } else if (left[0] === right[0]) {
//       sortedArray.push(left.shift());
//       right.shift();
//     }
//   }
//   return [...sortedArray, ...left, ...right];
// }

// NOTE: using pointers is more code, but keeps time complexity of O(n)!!
function merge(left, right) {
  let sortedArray = [];
  let i = 0; // Pointer for left array
  let j = 0; // Pointer for right array

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else if (left[i] > right[j]) {
      sortedArray.push(right[j]);
      j++;
    } else {
      // If elements are equal, add one and skip the duplicate
      sortedArray.push(left[i]);
      i++;
      j++;
    }
  }

  // Concatenate any remaining elements from left or right
  return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSortAndRemoveDuplicates(array) {
  if (!array) return null;

  const n = array.length;

  // base case
  if (n <= 1) {
    return array;
  }

  // mid point
  const mid = Math.floor(n / 2);

  // recursion to get to single value or blank array
  const left = mergeSortAndRemoveDuplicates(array.slice(0, mid));
  const right = mergeSortAndRemoveDuplicates(array.slice(mid));

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

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    // if the passed value isn't true, don't insert it
    if (value === null) return;

    // if the tree is currently empty, add new value as the root
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    // initialize variables for while loop
    let currentNode = this.root;
    let previousNode;
    let currentSide;

    // find where to insert new value and keep track of whether it goes on the left or right
    while (currentNode) {
      previousNode = currentNode;
      if (value === currentNode.data) {
        // ignore if duplicate
        return;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
        currentSide = "left";
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
        currentSide = "right";
      }
    }

    // append node
    previousNode[currentSide] = new Node(value);
  }

  deleteItem(value) {
    // if the passed value isn't true, don't delete it
    if (value === null) return;

    // initialize variables for while loop
    let currentNode = this.root;
    let previousNode;
    let doesNotExist = true;
    let currentSide;

    // find location of value in the tree
    while (currentNode && doesNotExist) {
      if (value === currentNode.data) {
        doesNotExist = false;
      }
      if (value < currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.left;
        currentSide = "left";
      } else if (value > currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.right;
        currentSide = "right";
      }
    }

    // if the value does not exist, don't delete it
    if (doesNotExist) return;

    // if value exists, delete per one of three conditions

    // Case 1. Delete a Leaf Node in BST
    if (currentNode.left === null && currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = null;
      } else {
        previousNode[currentSide] = null;
      }
    }
    // Case 2. Delete a Node with Single Child in BST
    else if (currentNode.left && currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else {
        previousNode[currentSide] = currentNode.left;
      }
    } else if (currentNode.left === null && currentNode.right) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else {
        previousNode[currentSide] = currentNode.right;
      }
    }
    // Case 3. Delete a Node with Both Children in BST
    else {
      let searchNode = currentNode.right;

      while (searchNode.left) {
        searchNode = searchNode.left;
      }

      this.deleteItem(searchNode.data);
      currentNode.data = searchNode.data;
    }
  }

  find(value) {
    // if the passed value isn't true, don't find it
    if (value === null) return null;

    // initialize variables for while loop
    let currentNode = this.root;

    // find location of value in the tree
    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A valid callback function is required.");
    }

    if (this.root === null) return;

    let currentNode = this.root;
    let queue = [currentNode];

    while (queue.length > 0) {
      let firstInQueue = queue.shift();
      callback(firstInQueue);

      if (firstInQueue.left) {
        queue.push(firstInQueue.left);
      }

      if (firstInQueue.right) {
        queue.push(firstInQueue.right);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A valid callback function is required.");
    }

    if (this.root === null) return;

    this.inOrderRecursion(this.root, callback);
  }

  inOrderRecursion(node, callback) {
    if (node === null) {
      return;
    }

    // Traverse the left subtree
    this.inOrderRecursion(node.left, callback);

    // Visit the current node
    callback(node);

    // Traverse the right subtree
    this.inOrderRecursion(node.right, callback);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A valid callback function is required.");
    }

    if (this.root === null) return;

    this.preOrderRecursion(this.root, callback);
  }

  preOrderRecursion(node, callback) {
    if (node === null) {
      return;
    }

    // Visit the current node
    callback(node);

    // Traverse the left subtree
    this.preOrderRecursion(node.left, callback);

    // Traverse the right subtree
    this.preOrderRecursion(node.right, callback);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A valid callback function is required.");
    }

    if (this.root === null) return;

    this.postOrderRecursion(this.root, callback);
  }

  postOrderRecursion(node, callback) {
    if (node === null) {
      return;
    }

    // Traverse the left subtree
    this.postOrderRecursion(node.left, callback);

    // Traverse the right subtree
    this.postOrderRecursion(node.right, callback);

    // Visit the current node
    callback(node);
  }

  height(node) {
    return this.heightRecursive(node);
  }

  heightRecursive(node) {
    if (node === null) {
      return -1;
    }

    return (
      1 +
      Math.max(
        this.heightRecursive(node.left),
        this.heightRecursive(node.right),
      )
    );
  }

  depth(node) {
    if (node === null) return null;

    const value = node.data;

    // if the passed value isn't true, don't find it
    if (value === null) return null;

    // initialize variables for while loop
    let currentNode = this.root;
    let depth = 0;

    // find location of value in the tree
    while (currentNode) {
      if (value === currentNode.data) {
        break;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
      depth++;
    }

    if (currentNode === null) return;

    return depth;
  }
}

export { Tree, prettyPrint };
