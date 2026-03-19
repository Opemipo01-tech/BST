# BST

## What is this project?  
This project builds a **Binary Search Tree** in JavaScript. A BST is a tree where:  
- Left children are smaller than the parent.  
- Right children are bigger than the parent.  
- No duplicate values are allowed.  

Think of it like a **sorted bookshelf** where each shelf splits books into “smaller” and “bigger” piles.

---

## What can it do?  

### Build & Maintain the Tree
- `buildTree(array)` – Turns an array of numbers into a **balanced tree** automatically.  
- `insert(value)` – Adds a number in the correct place.  
- `deleteItem(value)` – Removes a number from the tree.  
- `rebalance()` – Fixes the tree if it becomes unbalanced.

### Check & Explore
- `includes(value)` – Checks if a number is in the tree.  
- `height(value)` – How far the farthest leaf is from a node.  
- `depth(value)` – How far a node is from the root.  
- `isBalanced()` – Checks if the tree is balanced.

### Traversals
These let you visit all nodes in different orders:  
- `levelOrderForEach(callback)` – Breadth-first (level by level).  
- `inOrderForEach(callback)` – Left → Root → Right (sorted order).  
- `preOrderForEach(callback)` – Root → Left → Right.  
- `postOrderForEach(callback)` – Left → Right → Root.  

