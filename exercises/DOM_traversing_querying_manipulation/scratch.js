function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function countDirectAndIndirectChildNodes(node) {
  let directChildNodes = [];
  let indirectChildNodes = [];

  walk(node, n => {
    if (n.parentNode === node) {
      directChildNodes.push(n);
    } else {
      indirectChildNodes.push(n);
    }
  });

  return [directChildNodes.length, indirectChildNodes.length];
}