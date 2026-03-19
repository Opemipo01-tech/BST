const { array } = require("yargs");

class Node {
    constructor(value,left = null, right = null){
        this.value = value;
        this.left = left;
        this.right =right;
    }
}
class Tree {
    constructor(array){
        const cleanArray = [...new Set(array)].sort((a,b) => a-b);
        this.root = this.buildTree(cleanArray);
    }

    buildTree(cleanArray){
        if(cleanArray.length === 0) return null;
    
        const mid = Math.floor(cleanArray.length / 2);
        const leftSide = cleanArray.slice(0,mid);
        const rightSide = cleanArray.slice(mid + 1);

        return new Node(cleanArray[mid],
            this.buildTree(leftSide),
            this.buildTree(rightSide)
    );

    }

    includes(value) {
    let current = this.root; // start at the root

    while (current) {
        if (current.value === value) {
            return true; // found it
        }

        if (value < current.value) {
            current = current.left; // move left
        } else {
            current = current.right; // move right
        }
    }

    return false; 
}

insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
        this.root = newNode; // empty tree
        return;
    }

    let current = this.root;

    while (current) {
        if (value === current.value) {
            return; // do nothing if value exists
        }

        if (value < current.value) {
            if (!current.left) {
                current.left = newNode; // insert here
                return;
            }
            current = current.left; // move left
        } else {
            if (!current.right) {
                current.right = newNode; // insert here
                return;
            }
            current = current.right; // move right
        }
    }
  }

deleteItem(value, node = this.root) {
    // If node is null, value not found → do nothing
    if (!node) return null;

    // Traverse left if value is smaller
    if (value < node.value) {
        node.left = this.deleteItem(value, node.left);
    } 
    // Traverse right if value is greater
    else if (value > node.value) {
        node.right = this.deleteItem(value, node.right);
    } 
    // Node found
    else {
        // Case 1: No children (leaf node)
        if (!node.left && !node.right) return null;

        // Case 2: One child
        if (!node.left) return node.right; // only right child
        if (!node.right) return node.left; // only left child

        // Case 3: Two children
        // Find smallest node in right subtree (in-order successor)
        let successor = node.right;
        while (successor.left) {
            successor = successor.left;
        }

        // Replace current node value with successor value
        node.value = successor.value;

        // Delete the successor node from right subtree
        node.right = this.deleteItem(successor.value, node.right);
    }

    // Return updated node
    return node;
}

levelOrderForEach(callback) {
    // Throw an error if no callback function is provided
    if (!callback) {
        throw new Error("A callback is required");
    }

    // Create a queue to keep track of nodes to visit
    const queue = [];

    // Start with the root node (if it exists)
    if (this.root) queue.push(this.root);

    // Loop until there are no more nodes in the queue
    while (queue.length > 0) {
        // Remove the first node from the queue (FIFO)
        const current = queue.shift();

        // Call the callback function with the current node's value
        callback(current.value);

        // If the current node has a left child, add it to the queue
        if (current.left) queue.push(current.left);

        // If the current node has a right child, add it to the queue
        if (current.right) queue.push(current.right);
    }
   }
   
   preOrderForEach(callback) {
  if (!callback) {
      throw new Error("A callback is required");
  }

  function traverse(node) {
      if (node === null) {
          return; 
          // Stop if the node is empty
      }

      // First, visit the current node
      callback(node.value);
      
      // Then, visit the left child
      traverse(node.left);

      // Finally, visit the right child
      traverse(node.right);
  }

  // Start the traversal from the root
  traverse(this.root);
 }
   inOrderForEach(callback) {
    if (!callback) {
        throw new Error("A callback is required");
    }

    function traverse(node) {
        if (node === null) {
            return; 
            // Stop if the node is empty
        }

        // First, visit the left child
        traverse(node.left);

        // Then, visit the current node
        callback(node.value);

        // Finally, visit the right child
        traverse(node.right);
    }

    // Start the traversal from the root
    traverse(this.root);
   }

     postOrderForEach(callback) {
    if (!callback) {
        throw new Error("A callback is required");
    }

    function traverse(node) {
        if (node === null) {
            return; 
            // Stop if the node is empty
        }

        // First, visit the left child
        traverse(node.left);

        // Then, visit the right child
        traverse(node.right);
        
        // Finally, visit the current node
        callback(node.value);
    }

    // Start the traversal from the root
    traverse(this.root);
   }

   height(value) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
        if (value === current.value) break;
        else if (value < current.value) current = current.left;
        else current = current.right;
    }
    if (!current) return undefined;

    let maxHeight = 0;
    const stack = [{ node: current, height: 0 }];

    while (stack.length > 0) {
        const { node, height } = stack.pop();
        if (height > maxHeight) maxHeight = height;
        if (node.left) stack.push({ node: node.left, height: height + 1 });
        if (node.right) stack.push({ node: node.right, height: height + 1 });
    }

    return maxHeight;
}

 depth(value) {
    if (!this.root) return undefined; // Tree is empty

    let depth = 0; 
    let current = this.root;

    while (current) {
        if (value < current.value) {
            depth++;
            current = current.left;
        } else if (value > current.value) {
            depth++;
            current = current.right;
        } else { // value === current.value
            return depth;
        }
    }

    // Value not found
    return undefined;
}

isBalanced() {
    // Helper function: returns height if balanced, false if not
    function check(node) {
        if (node === null) return 0; // empty tree has height 0

        // Get height of left subtree
        const leftHeight = check(node.left);
        if (leftHeight === false) return false; // left is unbalanced

        // Get height of right subtree
        const rightHeight = check(node.right);
        if (rightHeight === false) return false; // right is unbalanced

        // Check difference in heights
        if (Math.abs(leftHeight - rightHeight) > 1) return false; // current node unbalanced

        // Return height of this node
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start at root and check to return either true or false
    return check(this.root) !== false;
}
   rebalance() {
    //  Collect all values in sorted order
    const values = [];
    
    // Use inOrderForEach traversal to fill the array
    this.inOrderForEach(value => values.push(value));

    //  Remove duplicates (optional) and ensure sorted array
    const cleanValues = [...new Set(values)].sort((a, b) => a - b);

    //  Rebuild the tree using buildTree
    this.root = this.buildTree(cleanValues);
} 
  }


