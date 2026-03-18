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
  }