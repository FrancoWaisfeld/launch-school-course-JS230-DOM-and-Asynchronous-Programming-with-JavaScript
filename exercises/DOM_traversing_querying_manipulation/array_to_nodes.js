// Nested array of nodes
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

function arrayToNodes(nodes) {
  let children = nodes[1];
  let parentElement = document.createElement(nodes[0])

  if (children.length === 0) {
    return parentElement;
  }

  children.forEach((child) => {
    parentElement.appendChild(arrayToNodes(child))
  });

  return parentElement;
}

document.querySelector('html').appendChild(arrayToNodes(nodes));