export function getRemoveSerialization(selection) {
  let _selection = [];

  if(Array.isArray(selection)) {
    _selection = selection.map((x, i) => x - i);
  }

  return _selection;
}

export function invertSelection(selection, maxIndex) {
  if(Array.isArray(selection)) {
    const _return = [...new Array(maxIndex).keys()];
    selection.forEach(i => _return[i] = null);
    return _return.filter(r => r !== null);
  } else {
    throw new Error('Can only invert arrays');
  }
}
