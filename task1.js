class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}
}

const root = new Node(5)
root.left = new Node(3)
root.right = new Node(7)
root.left.left = new Node(2)
root.left.right = new Node(5)
root.right.left = new Node(1)
root.right.right = new Node(0)
root.right.right.left = new Node(2)
root.right.right.right = new Node(8)
root.right.right.right.left = new Node(5)

function countLeafNodes(node) {
	if (node === null) {
		return 0
	}
	if (node.left === null && node.right === null) {
		return 1
	}
	return countLeafNodes(node.left) + countLeafNodes(node.right)
}

countLeafNodes(root.right)

const numLeafNodes = countLeafNodes(root)
console.log(numLeafNodes) // Output: 5

function maxPathLength(node) {
	if (node === null) {
		return 0
	}
	const leftPathLength = maxPathLength(node.left)
	const rightPathLength = maxPathLength(node.right)
	return Math.max(leftPathLength, rightPathLength) + 1
}

const maxLength = maxPathLength(root)
console.log(maxLength) // Output: 4

function areTreesEqual(tree1, tree2) {
	if (tree1 === null && tree2 === null) {
		return true
	}
	if (tree1 === null || tree2 === null) {
		return false
	}
	if (tree1.value !== tree2.value) {
		return false
	}
	return (
		areTreesEqual(tree1.left, tree2.left) &&
		areTreesEqual(tree1.right, tree2.right)
	)
}

const tree1 = root
const tree2 = new Node(5)
tree2.left = new Node(3)
tree2.right = new Node(7)
tree2.left.left = new Node(2)
tree2.left.right = new Node(5)
tree2.right.left = new Node(1)
tree2.right.right = new Node(0)
tree2.right.right.left = new Node(2)
tree2.right.right.right = new Node(8)
tree2.right.right.right.left = new Node(5)

const areEqual = areTreesEqual(tree1, tree2)
console.log(areEqual) // Output: true
