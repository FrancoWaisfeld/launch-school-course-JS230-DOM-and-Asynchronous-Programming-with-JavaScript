/*
  input: startId endId
  output: array of tagNames

  rules:
    - inclusive of endId
    - only consider element Nodes
    - only include elements that have body as an ancestor
    - if id attritubte of startId or endId is not in the DOM return undefined
    - if there is no path connecting startId to endId return undefined
      - there is a path if startId is a ancestor of endId

  algorithm:
    - return undefined if startId or endId don't exist

    - initialize tree to array consisting of endIdElement nodeName
    - declare parent
    - iterate once then stop when parent === body element
      - set parent to the parent node of parent
      - add paretn nodeName to tree
      - if parent === startIdElement
        - return tree
    
    - return undefined
*/

function sliceTree(startId, endId) {
  let startIdElement = document.getElementById(startId.toString());
  let endIdElement = document.getElementById(endId.toString());

  if (!startIdElement || !endIdElement) {
    return undefined;
  }

  let tree = [endIdElement.nodeName];
  let parent = endIdElement;

  do {
    parent = parent.parentNode;
    tree.push(parent.nodeName);

    if (parent === startIdElement) {
      return tree.reverse();
    }
  } while (parent !== document.body);

  return undefined;
}