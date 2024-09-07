function domTreeTracer(node) {
  let tree = [getAllSiblings(node)];

  let nextNode = node.parentNode;
  while (nextNode.parentNode.toString() !== '[object HTMLHtmlElement]') {
    tree.push(getAllSiblings(nextNode));
    nextNode = nextNode.parentNode;
  }

  return tree;
}

function getAllSiblings(node) {
  let parent = node.parentNode;
  let parentChildren = Array.prototype.slice.call(parent.children);

  return (parentChildren.map(child => {
    return child.nodeName
  }));
}

console.log(domTreeTracer(document.getElementById('1')));
console.log(domTreeTracer(document.getElementById('2')));
console.log(domTreeTracer(document.getElementById('22')));
