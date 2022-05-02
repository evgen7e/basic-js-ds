const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addNode(this.treeRoot, data);

    function addNode(node, data) {
      if (!node) { return new Node(data); }
      if (node.data === data) { return node; }
      node.data > data ? node.left = addNode(node.left, data) : node.right = addNode(node.right, data);
      return node;
    }
  }

  has(data) {
    return Boolean(this.find(data));

    /*return hasNode(this.treeRoot, data);

    function hasNode(node, data) {
      if (!node) { return false; }
      if (node.data === data) { return true; }
      return node.data > data ? hasNode(node.left, data) : hasNode(node.right, data);
    }*/
  }

  find(data) {
    return findNode(this.treeRoot, data);
    
    function findNode(node, data) {
      if (!node) { return null; }
      if (node.data === data) { return node; }
      return node.data > data ? findNode(node.left, data) : findNode(node.right, data);
    }
  }

  remove(data) {
    return removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) { return null; }

      if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else  if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minR = node.right;
        while (minR.left) {
          minR = minR.left;
        }
        node.data = minR.data;
        node.right = removeNode(node.right, minR.data);

        return node;
      }
    }
  }

  min() {
    if (!this.treeRoot) { return; }
    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.treeRoot) { return; }
    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};