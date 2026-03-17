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

    includes(value){
        
    }
}