function parentsCount(node, nodeToCountUntil) {
  let count = 0;
  let parent = node;
  while (parent !== nodeToCountUntil) {
    parent = parent.parentNode;
    count += 1;
  }

  return count;
}

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.children.length; index += 1) {
    walk(node.children[index], callback);
  }
}

function colorGeneration(generation) {
  walk(document.body, n => {
    if (parentsCount(n, document.body) === generation) {
      n.classList.add('generation-color');
    }
  });
}